"use client";
import React, { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi, address as contractAddress } from "../../config/config";
import { formatEther, parseEther, parseGwei } from "viem";

function page() {
  const { address, isConnected } = useAccount();
  const [investetAmt, setInvestedAmt] = useState("0");
  const [Bet, setBet] = useState(null);
  const [Loading, setLoading] = useState(false);

  const { data: currentAmountToBetOn } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getCurrentAmountToBetOn",
  }) as { data: bigint };

  const dollarToEth = (dollar: number, ethValue: bigint): number => {
    const result = dollar/parseInt(String(ethValue));
    return result
  };

  const { data: ethValue,refetch } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getEthValue",
  }) as {data:bigint, refetch : any};

  const { writeContract, isPending, isSuccess, isError, error } =
    useWriteContract();

  function onTransaction() {
    console.log("isconnected");

    const data = ethValue;
    console.log(data);
    console.log("HIE");
    
   
    
    

    // setLoading(true);
    // writeContract(config,{
    //   abi,
    //   address: contractAddress,
    //   functionName: 'placeBet',
    //   args: [Bet],
    //   value: parseEther(investetAmt)
    // })
    // isSuccess?? setLoading(false);
    // isError?? setLoading(false);
  }

  const handleClick = async () => {
    console.log("Fetching contract value...");
    const result = await refetch(); // re-runs contract read
    console.log("Contract Value:", result.data);
    const res1 = dollarToEth(7,result.data);
    console.log("MEOW : ",res1);
    

    
  };

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="bg-red-400">A</div>
      <div className="bg-purple-400">
        <button onClick={handleClick}>Button </button>
      </div>
      <div>C</div>
      <div>D</div>
    </div>
  );
}

export default page;
