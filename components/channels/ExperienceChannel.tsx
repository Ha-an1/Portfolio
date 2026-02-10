
import React from 'react';
import { EXPERIENCES, RECOMMENDATIONS } from '../../constants';

export const ExperienceChannel: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-black p-4 md:p-12 relative">
      {/* Neon Maze Grid Background */}
      <div className="absolute inset-0 pointer-events-none opacity-30" style={{
        backgroundImage: `linear-gradient(to right, #2121ff 2px, transparent 2px), linear-gradient(to bottom, #2121ff 2px, transparent 2px)`,
        backgroundSize: '60px 60px',
        boxShadow: 'inset 0 0 100px #000'
      }} />
      
      {/* Maze "Walls" Decorative */}
      <div className="absolute top-10 left-10 w-20 h-4 bg-transparent border-4 border-[#2121ff] rounded-full shadow-[0_0_15px_#2121ff] hidden md:block" />
      <div className="absolute bottom-20 right-10 w-4 h-24 bg-transparent border-4 border-[#2121ff] rounded-full shadow-[0_0_15px_#2121ff] hidden md:block" />

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-20 relative z-10 py-8 md:py-10">
        <section>
          <h1 className="text-[#ffff00] text-2xl md:text-4xl mb-8 md:mb-12 text-center uppercase tracking-[0.2em] font-bold drop-shadow-[0_0_10px_#ffff00]">
            CAREER PATH
          </h1>
          <div className="space-y-8 md:space-y-12">
            {EXPERIENCES.map((exp, idx) => (
              <div key={idx} className="bg-black border-2 md:border-4 border-[#2121ff] p-4 md:p-8 shadow-[0_0_20px_rgba(33,33,255,0.4)] relative overflow-hidden group">
                {/* Pacman Dot decorations */}
                <div className="absolute top-2 right-2 md:top-4 md:right-4 flex gap-1 md:gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ffb8ae] rounded-full" />
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ffb8ae] rounded-full" />
                </div>

                <div className="flex flex-col md:flex-row md:justify-between items-start mb-4 md:mb-6">
                  <h3 className="text-white text-base md:text-xl font-bold uppercase group-hover:text-[#ffff00] transition-colors">{exp.role}</h3>
                  <span className="text-[#ffb8ae] text-[8px] md:text-[10px] font-bold mt-1 md:mt-0 uppercase">{exp.duration}</span>
                </div>
                <div className="text-[#2121ff] text-xs md:text-sm mb-4 md:mb-8 italic font-bold uppercase tracking-widest">{exp.company}</div>
                <ul className="space-y-2 md:space-y-4 text-white text-[10px] md:text-xs font-mono font-bold">
                  {exp.tasks.map((task, i) => (
                    <li key={i} className="flex gap-2 md:gap-4 items-start">
                      <span className="text-[#ffff00]">•</span> 
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h1 className="text-white text-xl md:text-2xl mb-8 md:mb-10 uppercase text-center tracking-widest font-bold">RECOMMENDATIONS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {RECOMMENDATIONS.map((rec, idx) => (
              <div key={idx} className="bg-black border-2 md:border-4 border-[#ffb8ae] p-4 md:p-8 relative shadow-[inset_0_0_10px_rgba(255,184,174,0.2)] group hover:border-[#ffff00] transition-colors">
                <div className="absolute -top-3 -left-3 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 bg-black border-2 md:border-4 border-[#ffb8ae] rounded-full group-hover:border-[#ffff00]" />
                <p className="text-white text-[10px] md:text-[11px] mb-6 md:mb-8 italic font-bold leading-relaxed">
                  "{rec.text}"
                </p>
                <div className="border-t-2 border-[#2121ff] pt-2 md:pt-4">
                  <div className="text-[#ffb8ae] text-[10px] md:text-xs font-bold uppercase group-hover:text-[#ffff00]">{rec.author}</div>
                  <div className="text-[#2121ff] text-[8px] md:text-[9px] uppercase mt-1 md:mt-2 font-bold">{rec.role}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
