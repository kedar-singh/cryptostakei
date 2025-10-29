// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import "./owner.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Stake is Owner {
    using EnumerableSet for EnumerableSet.AddressSet;

    EnumerableSet.AddressSet private players; // Track of players
    struct PlayerDetails {
        bool value;
        uint256 amount;
    }

    AggregatorV3Interface internal dataFeed;
    
    mapping(address => PlayerDetails) StakePool;
    bool public isStakeActive = false;
    uint constant MINIMUM = 5 * 1e18; // 5 dollar
    uint BET; // 1 eth in dollar

    event WinningsDistributed(
        address indexed winner,
        uint256 payoutAmount,
        bool winningSide
    );
    
    event PoolStarted(uint256 ethPriceAtStart);
    event PoolEnded(bool winningSide, uint256 currentEthPrice);
    event FundsRefunded(address indexed player, uint256 amount);


    constructor() {
        dataFeed = AggregatorV3Interface(
            0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43
        );
    }

    function getCurrentAmountToBetOn() public view returns (uint256) {
        return BET;
    }

    function getEthValue() private view returns (uint256) {
        (, int256 price, , , ) = dataFeed.latestRoundData();
        require(price >= 0, "Negative price");
        return (uint256(price)) * (10 ** (18 - dataFeed.decimals()));
    }

    function placeBet(bool value) public payable {
        require(
            isStakeActive == true,
            "Pool is not currently active for betting"
        );
        require(msg.value > 0, "Must send Ether to place a bet");
        uint256 currentEthPrice = getEthValue();
        require(
            (msg.value * currentEthPrice) / 1e18 >= MINIMUM,
            "Bet value is less than 5 USD equivalent"
        );
        StakePool[msg.sender].value = value;
        StakePool[msg.sender].amount += msg.value;
        players.add(msg.sender);
    }

    function startPool() public isOwner {
        require(isStakeActive == false, "Pool is already active");
        isStakeActive = true;
        BET = getEthValue();
        emit PoolStarted(BET);
    }

    function endPool() public isOwner {
        require(isStakeActive == true, "Pool is not currently active");
        isStakeActive = false;
        distributePrice();
    }

    function refundAllPlayers(address[] memory currentPlayers) private {
        for (uint i = 0; i < currentPlayers.length; i++) {
            address player = currentPlayers[i];
            uint256 stakedAmount = StakePool[player].amount;
            
            // Refund the player's staked amount
            if (stakedAmount > 0) {
                (bool success, ) = player.call{value: stakedAmount}("");
                require(success, "Refund ETH transfer failed");
                emit FundsRefunded(player, stakedAmount);
            }

            // Cleanup specific player data
            delete StakePool[player];
        }
        
        // Final pool cleanup
        delete players; 
        BET = 0;
    }

    function distributePrice() private{
        uint256 currentPrice = getEthValue();
        bool winningValue = currentPrice > BET;
        emit PoolEnded(winningValue, currentPrice);
        uint256 totalPot = 0;
        uint256 winningPoolAmount = 0;
        address[] memory currentPlayers = players.values();

        for (uint i = 0; i < currentPlayers.length; i++) {
            address player = currentPlayers[i];
            uint256 stakedAmount = StakePool[player].amount;

            totalPot += stakedAmount;

            if (StakePool[player].value == winningValue) {
                winningPoolAmount += stakedAmount;
            }
        }
        if (winningPoolAmount == 0) {
 
            refundAllPlayers(currentPlayers);
            return;
        }

        uint256 totalLoserAmount = totalPot - winningPoolAmount;
        for (uint i = 0; i < currentPlayers.length; i++) {
            address player = currentPlayers[i];
            uint256 stakedAmount = StakePool[player].amount;

            if (StakePool[player].value == winningValue) {
                //formula
                uint256 share = (stakedAmount * totalLoserAmount * 1e18 / winningPoolAmount) / 1e18;
                uint256 totalPayout = stakedAmount + share;
                
                
                (bool success, ) = player.call{value: totalPayout}("");
                require(success, "ETH transfer failed for winner");

                emit WinningsDistributed(player, totalPayout, winningValue);
            }

            
            delete StakePool[player];
        }

        
        delete players; 
        BET = 0;
    }

    /// @notice Allows the owner to withdraw any remaining Ether balance from the contract.
    function ownerWithdraw() public isOwner {
        
        (bool success, ) = payable(getOwner()).call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }


    receive() external payable {}
}
