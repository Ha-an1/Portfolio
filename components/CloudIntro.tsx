
import React, { useEffect, useState } from 'react';

const CLOUD_COUNT = 40;

const PixelCloud: React.FC<{ style?: React.CSSProperties, className?: string, color?: string }> = ({ style, className, color = "white" }) => (
  <svg 
    viewBox="0 0 32 16" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    style={{ shapeRendering: 'crispEdges', ...style }}
  >
    {/* Base shape */}
    <path d="M8 0h16v4h-16zM4 4h24v4h-24zM0 8h32v8h-32z" fill={color} />
    {/* Shadow/Detail */}
    <path d="M10 2h4v2h-4z" fill="rgba(0,0,0,0.1)" />
  </svg>
);

export const CloudIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [clouds, setClouds] = useState<any[]>([]);
  const [clearing, setClearing] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Generate random clouds
    // We create enough clouds to cover the screen (approx)
    const newClouds = Array.from({ length: CLOUD_COUNT }).map((_, i) => ({
      id: i,
      left: Math.random() * 120 - 10, // -10% to 110%
      top: Math.random() * 120 - 10, // -10% to 110%
      scale: 3 + Math.random() * 5,
      delay: Math.random() * 1.5, // random start time for fade
      duration: 1 + Math.random() * 1.5 // duration of fade
    }));
    setClouds(newClouds);

    // Start clearing sequence after a brief pause
    const t1 = setTimeout(() => {
      setClearing(true);
    }, 1000); 

    // Cleanup and complete
    const t2 = setTimeout(() => {
      setRemoved(true);
      onComplete();
    }, 4000); 

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  if (removed) return null;

  return (
    <div 
      className={`absolute inset-0 z-[100] transition-colors duration-[2000ms] ease-out flex items-center justify-center pointer-events-none ${clearing ? 'bg-transparent' : 'bg-[#3a92ff]'}`}
    >
       {/* Background filler to prevent gaps before clearing */}
       <div className={`absolute inset-0 bg-[#3a92ff] transition-opacity duration-[1500ms] delay-500 ${clearing ? 'opacity-0' : 'opacity-100'}`} />

       {clouds.map(c => (
         <div
            key={c.id}
            className="absolute transition-all ease-out"
            style={{
                left: `${c.left}%`,
                top: `${c.top}%`,
                transform: `translate(-50%, -50%) scale(${c.scale})`,
                opacity: clearing ? 0 : 1,
                transitionDuration: `${c.duration}s`,
                transitionDelay: clearing ? `${c.delay}s` : '0s'
            }}
         >
           <PixelCloud style={{ width: 64, height: 32 }} />
         </div>
       ))}
       
       {/* Central text that fades out */}
       <div className={`absolute z-10 text-white font-bold text-4xl md:text-6xl uppercase tracking-widest drop-shadow-[4px_4px_0px_#000] transition-all duration-1000 ${clearing ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}`}>
         LOADING
       </div>
    </div>
  );
};
