"use client"
import React, { useState } from "react";
import { useAccount, useReadContract } from "wagmi";
import { abi, address as contractAddress } from "../../config/config";

function page() {
  const { address } = useAccount();
  const [investetAmt,setInvestedAmt] = useState();
  const topStakers = useReadContract({
    abi,
    address: contractAddress,
    functionName: "topStakers",
  });

  const ethValue = useReadContract({
    abi,
    address: contractAddress,
    functionName: "ethValue",
  });




  return (
    <div className="grid grid-cols-2 grid-rows-2">
      <div className="bg-red-400">A</div>
      <div className="bg-purple-400">B</div>
      <div>C</div>
      <div>D</div>
    </div>
  );
}

export default page;
