🚀 CryptoStake | Decentralized Price Prediction DApp

CryptoStake is a decentralized price prediction platform built on Ethereum, allowing users to bet on whether the price of a crypto asset (e.g., ETH/USD) will increase or decrease relative to a starting point. The platform uses Chainlink Oracles for secure, reliable, and decentralized price data.

✨ Features

Smart Contract Logic

Chainlink Integration: Uses the Chainlink AggregatorV3Interface (specifically the Sepolia ETH/USD Price Feed) to set the initial bet price and determine the final outcome.

Pool Lifecycle Management: The contract owner can explicitly start (startPool) and end (endPool) the betting cycle.

Shared Payout Model: Funds staked by losers are proportionally distributed among the winners.

Minimum Stake: Enforces a minimum bet equivalent to $5 USD at the time of transaction.

Re-staking: Players can increase their stake in the current pool.

Frontend Application

Wallet Integration: Seamless connection using Wagmi hooks.

USD Conversion: Automatically converts the user's dollar input into the required ETH value using the real-time Chainlink price feed for staking.

Responsive UI: Dark-themed, intuitive interface built with Tailwind CSS.

Admin Dashboard: Dedicated interface for the contract owner to manage the betting pool lifecycle.

🛠️ Tech Stack

Blockchain / Smart Contract

Solidity: Smart contract language.

Chainlink: Price Oracle for decentralized data feed.

EVM (Sepolia Testnet): Deployment environment (as indicated by the Chainlink address).

OpenZeppelin Contracts: Utilizes EnumerableSet for efficient player tracking.

Frontend / Client

Next.js (App Router): React framework for the application.

React: Frontend library.

Wagmi & Viem: Hooks and utilities for reliable Ethereum interaction.

Tailwind CSS: Utility-first CSS framework for styling.

📋 Prerequisites

Before setting up the project, ensure you have the following installed:

Node.js (LTS version) and npm or yarn.

MetaMask or equivalent wallet configured for the Sepolia Testnet.

Eth wallet (Admin): If you wish to use the admin functions, ensure your connected wallet address is set as the OWNER_ADDRESS placeholder in the frontend code.

🚀 Getting Started

Follow these steps to set up the project locally.

1. Clone the Repository

git clone [https://github.com/kedar-singh/cryptostakei.git](https://github.com/kedar-singh/cryptostakei.git)
cd cryptostakei



2. Install Dependencies

npm install 
# or
yarn install



3. Smart Contract Setup (Conceptual)

Assuming you have a Hardhat or similar directory structure:

Compile the Contract:

npx hardhat compile



Deploy to Sepolia: Deploy the Stake.sol contract to the Sepolia test network.

Update Configuration: Once deployed, update your frontend configuration file (e.g., config/config.ts or similar) with the new contract address and ABI.

4. Run the Frontend

Start the Next.js development server:

npm run dev
# or
yarn dev



The application will be accessible at http://localhost:3000.

⚙️ Usage Flow

User Flow

Connect Wallet: Navigate to the site and connect your wallet (or you will be redirected to the "Please Connect Your Wallet" page).

Check Price: View the current ETH/USD price from the Chainlink Oracle.

Place Bet: Enter a USD amount (min. 5 USD equivalent) and select either "Bet Up (Higher)" or "Bet Down (Lower)".

Confirm: Confirm the transaction in your wallet.

Admin Flow (Contract Owner)

Access Admin: If your connected address is the contract owner, a Go to Admin link appears on the main betting page.

Start Pool: Click Start New Pool to lock in the current ETH price (BET) and begin accepting bets.

End Pool: After a suitable period, click End Current Pool. This triggers the smart contract to:

Fetch the new ETH price.

Determine the winning side (Up or Down).

Calculate and distribute the winnings to successful players.

Reset the pool state.

📄 License

This project is licensed under the GPL-3.0 License. See the LICENSE file for details (if applicable).
