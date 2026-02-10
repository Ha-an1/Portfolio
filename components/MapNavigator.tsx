
import React from 'react';
import { Channel } from '../types';
import { playClick, playHover } from '../utils/sound';

interface MapNavigatorProps {
  onSelect: (channel: Channel) => void;
  isOpen: boolean;
  onClose: () => void;
  currentChannel: Channel;
}

export const MapNavigator: React.FC<MapNavigatorProps> = ({ onSelect, isOpen, onClose, currentChannel }) => {
  if (!isOpen) return null;

  const handleSelect = (id: Channel) => {
    playClick();
    onSelect(id);
  }

  const handleClose = () => {
    playClick();
    onClose();
  }

  const nodes = [
    { id: Channel.IDENTITY, label: '01', title: 'HOME', theme: '★', x: '10%', y: '60%' },
    { id: Channel.PROJECTS, label: '02', title: 'LEVELS', theme: '🍄', x: '30%', y: '40%' },
    { id: Channel.EXPERIENCE, label: '03', title: 'XP', theme: '👻', x: '50%', y: '65%' },
    { id: Channel.ABOUT, label: '04', title: 'HERO', theme: '🛢️', x: '70%', y: '45%' },
    { id: Channel.CONTACT, label: '05', title: 'BOSS', theme: '🎾', x: '90%', y: '70%' },
  ];

  return (
    <div className="absolute inset-0 z-[100] bg-[#f5e1b5] overflow-hidden flex flex-col items-center justify-center p-2 md:p-4">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/papyros.png")' }} />
      
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <button 
          onClick={handleClose}
          onMouseEnter={playHover}
          className="bg-black text-white px-4 py-2 md:px-6 md:py-2 border-2 md:border-4 border-white shadow-[2px_2px_0px_#888] md:shadow-[4px_4px_0px_#888] active:translate-y-1 active:shadow-none font-bold text-[10px] md:text-xs"
        >
          BACK
        </button>
      </div>

      {/* Added mt-16 on mobile to push title below the absolute back button */}
      <h1 className="pixel-text-gold text-xl md:text-5xl mb-8 md:mb-12 uppercase tracking-[0.2em] text-center z-10 drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[4px_4px_0px_#000] mt-16 md:mt-0">
        WORLD MAP
      </h1>

      <div className="relative w-full h-full max-w-5xl max-h-[600px] mb-10 md:mb-20">
        {/* Curved Path Svg */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
          <path 
            d="M 100 360 Q 200 240 300 240 T 500 390 T 700 270 T 900 420" 
            fill="none" 
            stroke="black" 
            strokeWidth="6" 
            strokeDasharray="15,15"
            className="opacity-30 hidden md:block"
          />
           {/* Simple path for mobile */}
           <path 
            d="M 50 300 L 950 300" 
            fill="none" 
            stroke="black" 
            strokeWidth="4" 
            strokeDasharray="10,10"
            className="opacity-30 md:hidden"
          />
        </svg>

        {nodes.map((node, index) => (
          <div 
            key={node.id} 
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
            style={{ 
              left: node.x, 
              top: node.y
            }}
          >
            <button
              onClick={() => handleSelect(node.id)}
              onMouseEnter={playHover}
              className={`relative w-14 h-16 md:w-28 md:h-32 flex flex-col items-center justify-center transition-all hover:scale-125 active:scale-95 ${
                currentChannel === node.id ? 'animate-bounce' : ''
              }`}
            >
              {/* Node Visuals inspired by the shield image */}
              <div className="absolute inset-0 bg-[#e76928] border-2 md:border-4 border-black rounded-b-xl md:rounded-b-2xl shadow-[4px_4px_0px_rgba(0,0,0,0.2)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.2)]" />
              <div className="absolute inset-1 md:inset-2 border-t-[8px] md:border-t-[12px] border-[#3a92ff] rounded-b-lg md:rounded-b-xl" />
              
              <div className="relative z-20 flex flex-col items-center">
                <span className="text-white text-lg md:text-3xl font-black drop-shadow-[2px_2px_0px_#000] md:drop-shadow-[3px_3px_0px_#000]">{node.label}</span>
                <span className="text-white text-[8px] md:text-[10px] mt-0.5 md:mt-1 font-bold opacity-80">{node.theme}</span>
              </div>

              {/* Green Stars Decoration - Hidden on mobile */}
              <div className="absolute -bottom-5 flex gap-1 items-end hidden md:flex">
                <div className="w-4 h-4 bg-[#78c850] border-2 border-black rotate-45" />
                <div className="w-6 h-6 bg-[#78c850] border-2 border-black rotate-45 mb-1" />
                <div className="w-4 h-4 bg-[#78c850] border-2 border-black rotate-45" />
              </div>
            </button>
            
            <div className="mt-4 md:mt-10 bg-black/80 px-2 md:px-3 py-1 border-2 border-white/50 text-white font-bold text-[6px] md:text-[10px] uppercase tracking-tighter opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {node.title}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative background mountains like in the image */}
      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-40 opacity-20 pointer-events-none">
        <svg viewBox="0 0 1000 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 100 L150 20 L300 100 L450 40 L600 100 L750 30 L1000 100 Z" fill="#8b4513" />
        </svg>
      </div>

      <div className="absolute bottom-4 md:bottom-8 text-black/40 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse text-center w-full">
        Choose your destiny
      </div>
    </div>
  );
};
