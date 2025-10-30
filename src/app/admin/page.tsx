
"use client"
import React from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { abi, address as contractAddress } from "../../config/config";
import { sepolia } from 'viem/chains';
import { redirect } from 'next/navigation';


function page() {

const {writeContract} = useWriteContract();
  const {isConnected} = useAccount();
  if (!isConnected) redirect("/pleaseconnect");
  const handleStartPool = async () => {
    try {
          const result = await writeContract({
            abi,
            address: contractAddress,
            functionName: "startPool",
            chainId: sepolia.id,
          });
        } catch (err:any) {
          console.error("Error Starting Pool:", err.message);
        }
    
  };

  
  const handleEndPool = async () => {
    try {
          const result = await writeContract({
            abi,
            address: contractAddress,
            functionName: "endPool",
            chainId: sepolia.id,
          });
        } catch (err:any) {
          console.error("Error Starting Pool:", err.message);
        }
    
  };

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans relative"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(30, 41, 59, 0.8), rgba(17, 24, 39, 1))",
      }}
    >
      <script src="https://cdn.tailwindcss.com"></script>
      
      {/* 🏡 Home Link - Top Left Corner */}
      <div className="absolute top-4 left-4 z-10">
        <a // Using standard <a> tag to function as a link
          href="/"
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 p-2 border border-cyan-500 rounded-md bg-gray-800/70"
        >
          Go to Home
        </a>
      </div>

      {/* Main Title Area */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-2">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-6xl">
            Admin
          </span>{" "}
          Options
        </h1>
        <p className="text-lg text-gray-400 max-w-md mx-auto">
          Manage the betting cycle for the platform.
        </p>
      </header>

      {/* Admin Controls Card */}
      <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700/50">
        
        <div className="flex flex-col space-y-6">
          {/* Button 1: Start Pool */}
          <button
            onClick={handleStartPool}
            className="w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-xl
                       bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 
                       transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start New Pool
          </button>

          {/* Button 2: End Pool */}
          <button
            onClick={handleEndPool}
            className="w-full py-3 text-lg font-bold rounded-lg transition-all duration-300 shadow-xl
                       bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 
                       transform hover:scale-[1.02] active:scale-[0.98]"
          >
            End Current Pool
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
