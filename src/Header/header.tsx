"use client"
import React from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
function Header() {
  return (
    <div className="m-2  ">

    
    <div className="w-full flex justify-between items-center px-5 py-2">
      <div className="text-white">Logo</div>
      <div className="">
        <ConnectButton />
      
      </div>
      <nav className="flex gap-10 justify-center">
        <Link href="/" className="text-black bg-white rounded px-2 py-1 flex items-center justify-center hover:bg-gray-200">Home</Link>
        <Link href="/stake" className="text-black bg-white rounded px-2 py-1 flex items-center justify-center hover:bg-gray-200">Stake</Link>
        <Link href={"./"} className="text-black bg-white rounded px-2 py-1 flex items-center justify-center hover:bg-gray-200 *">Gamble</Link>
      </nav>
      
      
    </div>
    </div>
  );
}

export default Header;
