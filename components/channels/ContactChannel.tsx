
import React from 'react';

export const ContactChannel: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#c8f08f] flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Grassy Patches */}
      <div className="absolute top-20 left-20 w-64 h-24 bg-[#90d068] rounded-[100%] opacity-40 blur-sm" />
      <div className="absolute bottom-40 right-10 w-80 h-32 bg-[#90d068] rounded-[100%] opacity-40 blur-sm" />
      
      {/* Pokemon-style Battle Circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-40 bg-[#90d068]/30 rounded-[100%] pointer-events-none rotate-[10deg]" />

      <div className="space-y-8 md:space-y-12 relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="text-center space-y-4">
          <h1 className="text-[#303030] text-2xl md:text-6xl font-bold uppercase tracking-tighter drop-shadow-[2px_2px_0px_#fff]">
            WILD ENCOUNTER!
          </h1>
          <p className="text-[#484848] text-[10px] md:text-sm font-bold uppercase tracking-[0.2em]">
            A DEVELOPER WANTS TO CONNECT!
          </p>
        </div>

        {/* Action Panel - Pokemon UI Style */}
        <div className="w-full bg-[#485058] border-[4px] md:border-[6px] border-[#303030] p-1 rounded-sm shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
          <div className="bg-[#f8f8f8] border-[4px] md:border-[6px] border-white p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between">
            <div className="w-full md:flex-1 space-y-2 md:space-y-4 text-center md:text-left">
              <p className="text-[#303030] text-sm md:text-2xl font-bold uppercase leading-tight">
                WHAT WILL<br/>YOU DO?
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2 md:gap-4 w-full md:w-auto md:min-w-[300px]">
              <a 
                href="mailto:haani2494@gmail.com" 
                className="p-3 md:p-4 bg-white border-2 md:border-4 border-[#303030] hover:bg-[#ff8866] hover:text-white transition-all text-[#303030] font-bold text-[10px] md:text-xs uppercase text-center shadow-[2px_2px_0px_#303030] md:shadow-[4px_4px_0px_#303030] active:translate-y-1 active:shadow-none"
              >
                EMAIL
              </a>
              <a 
                href="https://www.linkedin.com/in/haani-behzad-078a17274/" target="_blank" rel="noopener noreferrer" 
                className="p-3 md:p-4 bg-white border-2 md:border-4 border-[#303030] hover:bg-[#66ccff] hover:text-white transition-all text-[#303030] font-bold text-[10px] md:text-xs uppercase text-center shadow-[2px_2px_0px_#303030] md:shadow-[4px_4px_0px_#303030] active:translate-y-1 active:shadow-none"
              >
                LINKEDIN
              </a>
              <a 
                href="https://github.com/Ha-an1" target="_blank" rel="noopener noreferrer" 
                className="p-3 md:p-4 bg-white border-2 md:border-4 border-[#303030] hover:bg-[#333] hover:text-white transition-all text-[#303030] font-bold text-[10px] md:text-xs uppercase text-center shadow-[2px_2px_0px_#303030] md:shadow-[4px_4px_0px_#303030] active:translate-y-1 active:shadow-none"
              >
                GITHUB
              </a>
              <a 
                href="https://drive.google.com/file/d/1BBgUxVHna38jga_J4yUmK8s4EbYgLt72/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 md:p-4 bg-white border-2 md:border-4 border-[#303030] hover:bg-[#FF4C4C] hover:text-white transition-all text-[#303030] font-bold text-[10px] md:text-xs uppercase text-center shadow-[2px_2px_0px_#303030] md:shadow-[4px_4px_0px_#303030] active:translate-y-1 active:shadow-none"
              >
                RESUME
              </a>
            </div>
          </div>
        </div>

        <div className="text-[#484848] text-[8px] md:text-[10px] font-bold mt-8 md:mt-12 uppercase tracking-widest bg-white/40 px-4 py-1 rounded-full text-center">
          Level 21 Computer Science Student
        </div>
      </div>
    </div>
  );
};
