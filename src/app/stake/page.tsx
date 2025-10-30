"use client";

import { useCallback, useState } from "react";
import { sepolia } from "viem/chains";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { abi, address as contractAddress } from "../../config/config";
import { formatEther, parseEther } from "viem";

import { redirect } from "next/navigation";
import Link from "next/link";

function page() {
  const { address, isConnected } = useAccount();

  if (!isConnected) redirect("/pleaseconnect");

  const [error, setError] = useState<string>("");

  const [investetAmt, setInvestedAmt] = useState(150);
  const [Bet, setBet] = useState(true);

  const { writeContract, isSuccess } = useWriteContract();

  const dollarToEth = (dollar: number, ethValue: bigint): number => {
    const result = dollar / parseInt(String(ethValue));
    return result;
  };

  const { data: ethValue, refetch } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getEthValue",
  }) as { data: bigint; refetch: any };

  const { data: currentBet } = useReadContract({
    abi,
    address: contractAddress,
    functionName: "getCurrentAmountToBetOn",
  }) as {data:string};

  async function handleTransaction(dollar: number) {
    

    const Etherium = await refetch(); 
    const ethRate = Number(Etherium.data) / 10 ** 8; 

    

    // Convert dollar to equivalent ETH
    const ethAmount = dollar / ethRate;
    

    
    try {
      const result = await writeContract({
        abi,
        address: contractAddress,
        functionName: "placeBet",
        args: [Bet],
        value: parseEther(ethAmount.toString()),
        chainId: sepolia.id,
      });
      
    } catch (err) {
      
      console.error("Error sending tx:", err);
    }
  }

  const handleBetAmountChange = useCallback((e: any) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setInvestedAmt(value);
  }, []);

  

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans relative"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(30, 41, 59, 0.8), rgba(17, 24, 39, 1))",
      }}
    >
     
      {isConnected && (address === process.env.NEXT_PUBLIC_OWNER) && (
        <div className="absolute top-4 right-4 z-10">
          <Link
            href="/admin"
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors duration-200 p-2 border border-indigo-500 rounded-md bg-gray-800/70"
          >
            Go to Admin
          </Link>
        </div>
      )}

      <script src="https://cdn.tailwindcss.com"></script>

      
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">
          
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-6xl">
            Crypto
          </span>{" "}
          Bet
        </h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Predict market movement and earn high yields on your predictions.
        </p>
      </header>

      
      <div className="w-full max-w-sm bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700/50">
      
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Current Asset Value
          </label>
          <div className="flex items-center justify-center p-3 bg-gray-700 rounded-lg text-2xl font-semibold border-2 border-cyan-500/50">
           
            <span className="text-blue-500">
              {Number(ethValue) / 10 ** 8} $
            </span>
          </div>
        </div>

   
        <div className="mb-6">
          <label
            htmlFor="betAmount"
            className="block text-sm font-medium text-gray-400 mb-1"
          >
            Input Amount to Bet
          </label>
          <div className="relative">
            <input
              id="betAmount"
              type="text"
              value={investetAmt}
              onChange={handleBetAmountChange}
              placeholder="e.g., 100.00"
              className="w-full p-3 pr-10 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-500 text-lg"
            />
         
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
              USD
            </span>
          </div>
        </div>

        <div className="mb-6">
          <p className="block text-sm font-medium text-gray-400 mb-2">
            Select Prediction
          </p>
          <div className="flex space-x-4">
 
            <label
              className={`flex-1 flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                Bet === true
                  ? "bg-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/30"
                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
              }`}
            >
              <input
                type="radio"
                name="Bet"
                value="UP"
                checked={Bet === true}
                onChange={() => setBet(true)}
                className="hidden"
              />
              <span
                className={`font-semibold ${
                  Bet === true ? "text-white" : "text-gray-300"
                }`}
              >
                Bet Up (Higher)
              </span>
            </label>

      
            <label
              className={`flex-1 flex items-center justify-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                Bet === false
                  ? "bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-500/30"
                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
              }`}
            >
              <input
                type="radio"
                name="Bet"
                value="DOWN"
                checked={Bet === false}
                onChange={() => setBet(false)}
                className="hidden"
              />
              <span
                className={`font-semibold ${
                  Bet === false ? "text-white" : "text-gray-300"
                }`}
              >
                Bet Down (Lower)
              </span>
            </label>
          </div>
        </div>

      
        <button
  
          onClick={() => handleTransaction(Number(investetAmt))}
          disabled={Number(investetAmt) < 150 ? true : false}
          className="w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-xl
            bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 
            disabled:bg-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
        >
          Place Bet
        </button>

      
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Amount to Bet On:</p>
          <div className="text-center p-2 bg-gray-900 rounded-md font-mono text-xl">
            <span className="text-yellow-400">{currentBet}</span>
          </div>
        </div>
      </div>

      {isSuccess && (
        <div className="mt-6 p-4 max-w-sm w-full bg-green-900/50 border border-green-700 text-green-300 rounded-lg text-center shadow-lg transition-opacity duration-500">
          Transaction Successful
        </div>
      )}
    </div>
  );
}

export default page;
