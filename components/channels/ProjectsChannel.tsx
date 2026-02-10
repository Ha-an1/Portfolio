
import React from 'react';
import { PROJECTS } from '../../constants';

export const ProjectsChannel: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#5c94fc] p-4 md:p-12 relative flex flex-col items-center">
      {/* Pixelated Clouds SVG Pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='80' viewBox='0 0 120 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 40h20v10H20zM40 30h40v10H40zM80 40h20v10H80zM30 50h60v10H30z' fill='%23fff'/%3E%3C/svg%3E")`,
        backgroundSize: '300px 200px',
        backgroundRepeat: 'repeat'
      }} />

      <div className="max-w-6xl w-full mx-auto relative z-10 py-8 md:py-12">
        <h1 className="pixel-text-white text-2xl md:text-5xl mb-10 md:mb-16 uppercase text-center drop-shadow-[2px_2px_0px_#e76928] md:drop-shadow-[4px_4px_0px_#e76928]">
          MY MISSIONS
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="bg-[#f8f8f8] border-2 md:border-4 border-black p-4 md:p-8 shadow-[6px_6px_0px_#000] md:shadow-[10px_10px_0px_#000] hover:-translate-y-2 transition-transform group">
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <h2 className="text-[#c84c0c] text-lg md:text-2xl font-bold uppercase group-hover:underline">
                  {project.title}
                </h2>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-[#f7d51d] border-2 border-black flex items-center justify-center font-bold text-sm">?</div>
              </div>
              
              <p className="text-black text-[10px] md:text-sm mb-6 md:mb-8 leading-relaxed font-bold font-mono bg-white p-3 md:p-4 border-2 border-dashed border-black">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6 md:mb-10">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-1 bg-black text-white text-[8px] md:text-[10px] uppercase font-bold">
                    {t}
                  </span>
                ))}
              </div>
              
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 md:px-6 md:py-3 bg-[#e76928] border-2 md:border-4 border-black text-white text-[10px] md:text-[12px] font-bold hover:bg-white hover:text-black transition-colors uppercase shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000]"
              >
                ACCESS DATA
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Brick Ground at bottom of this section content */}
      <div className="w-full h-8 md:h-16 bg-[#944444] z-0 mt-auto border-t-2 md:border-t-4 border-black" style={{
        backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 38px, #000 38px, #000 40px), repeating-linear-gradient(0deg, transparent, transparent 18px, #000 18px, #000 20px)`,
        backgroundSize: '40px 20px'
      }} />
    </div>
  );
};
