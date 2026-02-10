
import React, { useEffect, useState } from 'react';

export const CRTOverlay: React.FC = () => {
  return (
    <>
      {/* Scanlines */}
      <div 
        className="pointer-events-none absolute inset-0 z-50 opacity-10"
        style={{
          background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 255, 0, 0.06))',
          backgroundSize: '100% 4px, 3px 100%'
        }}
      />
      
      {/* Curved Screen Vignette */}
      <div 
        className="pointer-events-none absolute inset-0 z-[51]"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
        }}
      />

      {/* Subtle Screen Flicker */}
      <div className="pointer-events-none absolute inset-0 z-40 bg-white/5 animate-pulse opacity-[0.03]" />
    </>
  );
};

export const LoadingTransition: React.FC<{ active: boolean }> = ({ active }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (active) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(prev => (prev < 100 ? prev + 10 : 100));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [active]);

  if (!active) return null;
  
  return (
    <div className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="relative h-12 md:h-16 w-full bg-white border-4 border-black p-1 mb-8 overflow-hidden shadow-[8px_8px_0px_#333]">
          {/* Progress fill */}
          <div 
            className="h-full bg-[#52ae7f] border-r-4 border-black transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
          {/* 8-bit segment lines */}
          <div className="absolute inset-0 flex">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="flex-1 border-r-4 border-black/20" />
             ))}
          </div>
        </div>
        <div className="pixel-text-white text-sm md:text-xl text-center animate-pulse">
          LOADING.... {progress}%
        </div>
      </div>
    </div>
  );
};
