"use client";

import React from 'react';

import Link from 'next/link'; 


function Home() {


  
  
  const StyledLink = ({ href, children }:{href:string,children:React.ReactNode}) => (
    <Link 
      href={href} 
      className="text-blue-500 font-extrabold text-2xl hover:opacity-80 transition-opacity duration-200"
    >
      {children}
    </Link>
  );

  return (
    <div
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans"
      style={{
        backgroundImage:
          "radial-gradient(circle at center, rgba(30, 41, 59, 0.8), rgba(17, 24, 39, 1))",
      }}
    >
      <script src="https://cdn.tailwindcss.com"></script>

     
      <div className="w-full max-w-md bg-gray-800 p-10 rounded-xl shadow-2xl border border-gray-700/50 text-center">
        
        
        <h2 className="text-4xl font-extrabold mb-4 text-white">
          Please Connect Your Wallet
        </h2>
        <p className="text-lg text-gray-400 mb-8">
            To Access Betting Features, Connect your Etherium Wallet
        </p>
        
        
        <div className="flex items-center justify-center text-xl font-medium text-gray-200">
          <span >Go to : </span>
          <StyledLink href='/'>Homepage</StyledLink>
        </div>
      </div>
    </div>
  );
}

export default Home;
