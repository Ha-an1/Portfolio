
import React from 'react';

interface IdentityChannelProps {
  onStart: () => void;
}

export const IdentityChannel: React.FC<IdentityChannelProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full pixel-bg-gradient flex flex-col items-center justify-center text-center p-8 overflow-hidden relative">
      <div className="dither-overlay" />
      
      <div className="mb-12">
        <h1 className="pixel-text-gold text-4xl md:text-7xl font-bold tracking-tighter leading-tight drop-shadow-[8px_8px_0px_#000]">
          HAANI BEHZAD KUNIYIL
        </h1>
      </div>

      <div className="space-y-8 max-w-2xl relative z-10">
        <h2 className="pixel-text-white text-lg md:text-2xl uppercase leading-relaxed bg-black/20 p-4 rounded-lg border-2 border-white/10">
          Computer Science<br/>Student
        </h2>
        <div className="text-blue-900 text-sm md:text-lg font-bold tracking-widest">
          VIT • CLASS OF 2027
        </div>
      </div>

      <div className="mt-24">
        <button 
          onClick={onStart}
          className="group relative px-10 py-4 bg-black border-4 border-white shadow-[10px_10px_0px_rgba(255,255,255,0.2)] hover:scale-110 active:translate-y-2 active:shadow-none transition-all"
        >
          <span className="pixel-text-white text-xl md:text-2xl animate-pulse">PRESS START</span>
        </button>
      </div>

      <div className="absolute bottom-10 text-white/30 text-[10px] uppercase tracking-[0.5em] font-bold">
        Insert Coin to Continue
      </div>
    </div>
  );
};
