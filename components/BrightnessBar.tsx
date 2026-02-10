
import React from 'react';

interface BrightnessBarProps {
  value: number;
  onChange: (val: number) => void;
}

export const BrightnessBar: React.FC<BrightnessBarProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-zinc-800 rounded-lg border-2 border-zinc-700 shadow-xl">
      <span className="text-zinc-400 text-xs tracking-widest uppercase mb-1">Brightness</span>
      <div className="flex items-center gap-1">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            onClick={() => onChange((i + 1) * 10)}
            className={`w-3 h-8 cursor-pointer border-[1px] border-black transition-colors ${
              (i + 1) * 10 <= value ? 'bg-amber-500 shadow-[0_0_5px_#f59e0b]' : 'bg-zinc-900'
            }`}
          />
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        <button 
          onClick={() => onChange(Math.max(0, value - 10))}
          className="px-2 py-1 bg-zinc-900 border border-zinc-600 text-zinc-300 hover:text-white active:bg-zinc-700 text-sm"
        >
          -
        </button>
        <button 
          onClick={() => onChange(Math.min(100, value + 10))}
          className="px-2 py-1 bg-zinc-900 border border-zinc-600 text-zinc-300 hover:text-white active:bg-zinc-700 text-sm"
        >
          +
        </button>
      </div>
    </div>
  );
};
