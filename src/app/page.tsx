"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import backgroundImage1 from "../Images/backgroundWave.jpg";

export default function Home() {
  const backgroundImageUrl = backgroundImage1.src;
  return (
    <div
      
      className="h-screen flex flex-col items-center justify-center text-white font-sans p-4 relative" 
      style={{
        
        backgroundImage: `url('${backgroundImageUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 55%",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      <div className="absolute inset-0 bg-black opacity-40"></div> 

     
      <div className="relative z-10 flex flex-col items-center justify-center max-w-2xl w-full space-y-12">
        <header className="text-center space-y-4">
          <h1 className="text-6xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 sm:text-7xl">
            Crypto Stakei
          </h1>

          <p className="text-xl text-gray-300 max-w-md mx-auto">
            Secure your assets, earn high yields. The next generation of DeFi
            staking is here.
          </p>
        </header>

        <div className="w-full flex flex-col items-center space-y-10">
          <div className="w-100 flex justify-center">
            
            <div className="p-2 bg-gray-800 bg-opacity-70 rounded-xl shadow-lg border border-gray-700">
                <ConnectButton />
            </div>
          </div>

          <Link
            href="/stake"
            className="
                w-full sm:w-80 
                py-4 px-8 
                text-center text-lg font-semibold 
                bg-blue-600 hover:bg-blue-700 
                rounded-lg shadow-lg 
                transition duration-300 
                transform hover:scale-[1.03]
                focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
            "
          >
            Get Started
          </Link>
        </div>
      </div>

     
      <footer className="relative z-10 bottom-0 text-sm text-gray-400 mt-8">
        Decentralized & Works on Testnet
      </footer>
    </div>
  );
}
