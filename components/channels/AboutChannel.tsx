
import React from 'react';

const Ladder: React.FC<{ height: string }> = ({ height }) => (
  <div className={`w-10 ${height} border-x-4 border-white flex flex-col justify-around py-1`}>
    {[...Array(8)].map((_, i) => (
      <div key={i} className="h-1.5 bg-white mx-1" />
    ))}
  </div>
);

const Barrel: React.FC = () => (
  <div className="w-10 h-14 bg-[#3a92ff] border-4 border-black rounded-sm relative shadow-[4px_4px_0px_#000]">
    <div className="absolute top-2 left-0 right-0 h-1 bg-black/20" />
    <div className="absolute bottom-2 left-0 right-0 h-1 bg-black/20" />
    <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-[8px] animate-pulse">!</div>
  </div>
);

export const AboutChannel: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black p-4 md:p-12 relative flex flex-col items-center overflow-hidden">
      <div className="dither-overlay opacity-20" />
      
      {/* Arcade Score/Stats HUD */}
      <div className="absolute top-4 right-4 md:top-12 md:right-12 text-white font-mono text-xs md:text-2xl space-y-1 md:space-y-2 text-right opacity-80 md:opacity-100">
        <div className="text-red-500">HIGH SCORE</div>
        <div>004200</div>
      </div>

      <div className="max-w-5xl w-full z-10 py-12 flex flex-col items-center">
        <div className="mb-12 md:mb-20 text-center px-4">
          <h1 className="pixel-text-white text-3xl md:text-7xl uppercase italic drop-shadow-[4px_4px_0px_#ff4444] md:drop-shadow-[8px_8px_0px_#ff4444] animate-pulse leading-tight">
            HERO BIO
          </h1>
        </div>

        {/* Level 3: The Top */}
        <div className="w-full relative border-b-[8px] md:border-b-[16px] border-red-600 pb-10 md:pb-16 flex justify-center">
          <div className="bg-[#111] border-2 md:border-4 border-[#f7d51d] p-4 md:p-8 max-w-2xl shadow-[6px_6px_0px_#ff4444] md:shadow-[12px_12px_0px_#ff4444] relative w-full mx-2 md:mx-0">
            <h2 className="pixel-text-gold text-lg md:text-2xl mb-4 md:mb-6 uppercase">QUEST LOG</h2>
            <p className="text-white text-xs md:text-base font-bold leading-relaxed font-mono">
              HAANI BEHZAD KUNIYIL IS A LEVEL 21 COMPUTER SCIENCE STUDENT AT VIT VELLORE. 
              SPECIALIZE IN BACKEND DEVELOPMENT, ML MODEL TRAINING AND NLP SYSTEM INTEGRATION.
            </p>
            {/* Kong decoration placeholder - hidden on mobile */}
            <div className="absolute -top-10 -right-2 md:-top-20 md:-right-10 w-16 h-16 md:w-24 md:h-24 bg-red-900 border-4 md:border-8 border-black rounded-lg flex items-center justify-center">
               <div className="w-8 h-8 md:w-12 md:h-12 bg-[#ff4444] rounded-full animate-bounce" />
            </div>
          </div>
          <div className="absolute right-4 md:right-20 bottom-0 hidden md:block">
            <Ladder height="h-32" />
          </div>
        </div>

        {/* Level 2: Mid */}
        <div className="w-full relative border-b-[8px] md:border-b-[16px] border-red-600 py-10 md:py-20 flex justify-center md:justify-end pr-0 md:pr-32">
          <div className="absolute left-4 md:left-20 top-0 hidden md:block">
             <Ladder height="h-40" />
          </div>
          <div className="bg-[#111] border-2 md:border-4 border-white p-4 md:p-8 max-w-xl shadow-[6px_6px_0px_#3a92ff] md:shadow-[12px_12px_0px_#3a92ff] w-full mx-2 md:mx-0">
            <h2 className="pixel-text-white text-lg md:text-2xl mb-4 md:mb-6 uppercase">ABILITIES</h2>
            <div className="space-y-4">
              {['BACKEND DEVELOPMENT', 'MODEL TRAINING', 'NLP ENGINEERING'].map(skill => (
                <div key={skill} className="flex items-center gap-4">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-600" />
                  <span className="text-white text-xs md:text-base font-bold">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute right-4 md:right-10 bottom-2 md:bottom-4 flex gap-2 md:gap-4 hidden md:flex">
            <Barrel />
            <Barrel />
          </div>
        </div>

        {/* Level 1: Bottom */}
        <div className="w-full relative border-b-[8px] md:border-b-[16px] border-red-600 pt-10 md:pt-20 flex justify-center md:justify-start pl-0 md:pl-20">
          <div className="bg-[#111] border-2 md:border-4 border-white p-4 md:p-8 max-w-md shadow-[6px_6px_0px_#78c850] md:shadow-[12px_12px_0px_#78c850] w-full mx-2 md:mx-0">
            <h2 className="pixel-text-gold text-lg md:text-xl mb-4 md:mb-6 uppercase">MISSION</h2>
            <p className="text-white text-[10px] md:text-xs font-bold leading-loose">
              TURNING ARTIFICIAL INTELLIGENCE INTO PRACTICAL IMPACT.
              BUILDING SYSTEMS THAT LEARN, ADAPT, AND SCALE.
            </p>
          </div>
          <div className="absolute right-4 md:right-40 top-0 hidden md:block">
             <Ladder height="h-40" />
          </div>
        </div>

        <div className="mt-16 md:mt-32 w-full h-8 bg-[#333] flex justify-between px-4 md:px-20">
           <div className="w-8 h-8 md:w-10 md:h-10 -mt-8 md:-mt-10 bg-white border-4 border-black" /> 
           <div className="flex gap-10 md:gap-20 hidden md:flex">
              <div className="w-8 h-8 -mt-8 bg-[#ff4444] border-4 border-black animate-bounce" />
              <div className="w-8 h-8 -mt-8 bg-[#ff4444] border-4 border-black animate-bounce delay-100" />
           </div>
        </div>
      </div>
    </div>
  );
};
