
import React from 'react';

interface BrightnessKnobProps {
  value: number;
  onChange: (val: number) => void;
}

export const BrightnessKnob: React.FC<BrightnessKnobProps> = ({ value, onChange }) => {
  const rotation = (value / 100) * 270 - 135; // Map 0-100 to -135 to 135 deg

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    
    const newVal = Math.min(100, Math.max(0, Math.round((angle / 360) * 100)));
    onChange(newVal);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-[#f3f4f6] border-4 border-black shadow-[8px_8px_0px_#000] rounded-none">
      <span className="text-black text-[10px] uppercase font-bold">Brightness</span>
      <div 
        className="relative w-20 h-20 bg-zinc-300 rounded-full border-4 border-black cursor-pointer group flex items-center justify-center shadow-[inset_-4px_-4px_0px_#9ca3af,inset_4px_4px_0px_#fff]"
        onClick={handleClick}
      >
        <div 
          className="absolute w-1 h-8 bg-red-600 border-2 border-black origin-bottom transition-transform duration-200"
          style={{ transform: `rotate(${rotation}deg) translateY(-14px)` }}
        />
        <div className="w-4 h-4 bg-zinc-400 rounded-full border-2 border-black shadow-inner" />
      </div>
      <div className="text-black text-[8px] font-bold">{value}%</div>
      <div className="flex gap-2">
         <button 
           onClick={() => onChange(Math.max(0, value - 10))} 
           className="bg-black text-white border-2 border-white p-2 hover:bg-zinc-800 text-[10px] font-bold shadow-[2px_2px_0px_#444] transition-colors"
         >
           -
         </button>
         <button 
           onClick={() => onChange(Math.min(100, value + 10))} 
           className="bg-black text-white border-2 border-white p-2 hover:bg-zinc-800 text-[10px] font-bold shadow-[2px_2px_0px_#444] transition-colors"
         >
           +
         </button>
      </div>
    </div>
  );
};
