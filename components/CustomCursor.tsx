
import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible]);

  return (
    <div 
      className={`fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block ${!isVisible ? 'opacity-0' : 'opacity-100'}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'opacity 0.1s ease-out', // Removed transform transition for snappier movement
      }}
    >
      <div className={`relative transition-transform duration-75 origin-top-left ${isClicking ? 'scale-90' : 'scale-100'}`}>
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ 
            shapeRendering: 'crispEdges',
            filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.4))'
          }}
        >
          {/* 
             Classic Pixel Pointer Shape 
             Using a path that creates a sharp, aliased look.
             strokeWidth="2" with crispEdges creates the blocky outline.
          */}
          <path 
            d="M0 0V17L4 13H5L8 20L11 19L8 12H13L0 0Z" 
            fill="white" 
            stroke="black" 
            strokeWidth="2"
            paintOrder="stroke"
          />
        </svg>
      </div>
    </div>
  );
};
