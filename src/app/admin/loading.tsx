import React from 'react'



function loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 font-sans">
      
      {/* Container for the loader interface */}
      <div className="p-10  flex flex-col items-center">
        

        
        <style >{`
          /* Custom CSS variables for the loader */
          .dot-wave {
            --uib-size: 60px; /* Overall width of the loader */
            --uib-speed: 0.7s; /* Speed of the jump cycle */
            --uib-color: #4f46e5; /* Using Tailwind indigo-600 for the dots */
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;
            width: var(--uib-size);
            /* Height is calculated based on dot size plus padding for the jump height */
            height: calc(var(--uib-size) * 0.17); 
            padding-top: calc(var(--uib-size) * 0.34);
          }

          .dot-wave__dot {
            flex-shrink: 0;
            width: calc(var(--uib-size) * 0.17);
            height: calc(var(--uib-size) * 0.17);
            border-radius: 50%;
            background-color: var(--uib-color);
            will-change: transform;
          }

          /* Animation Delays for the Wave Effect */
          .dot-wave__dot:nth-child(1) {
            animation: jump824 var(--uib-speed) ease-in-out
              calc(var(--uib-speed) * -0.45) infinite;
          }

          .dot-wave__dot:nth-child(2) {
            animation: jump824 var(--uib-speed) ease-in-out
              calc(var(--uib-speed) * -0.3) infinite;
          }

          .dot-wave__dot:nth-child(3) {
            animation: jump824 var(--uib-speed) ease-in-out
              calc(var(--uib-speed) * -0.15) infinite;
          }

          .dot-wave__dot:nth-child(4) {
            animation: jump824 var(--uib-speed) ease-in-out infinite;
          }

          /* Keyframes for the vertical jump motion */
          @keyframes jump824 {
            0%,
            100% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-200%);
            }
          }
        `}</style>

        {/* The Loader Structure (JSX equivalent of the provided HTML) */}
        <div className="dot-wave">
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
          <div className="dot-wave__dot"></div>
        </div>
      </div>
    </div>
  )
}

export default loading