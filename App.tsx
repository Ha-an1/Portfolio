
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Channel } from './types';
import { CRTOverlay, LoadingTransition } from './components/CRTOverlay';
import { CustomCursor } from './components/CustomCursor';
import { ChatBot } from './components/ChatBot';
import { IdentityChannel } from './components/channels/IdentityChannel';
import { ProjectsChannel } from './components/channels/ProjectsChannel';
import { ExperienceChannel } from './components/channels/ExperienceChannel';
import { ContactChannel } from './components/channels/ContactChannel';
import { AboutChannel } from './components/channels/AboutChannel';
import { MapNavigator } from './components/MapNavigator';
import { playClick, playPowerOn, playChannelSwitch, playHover } from './utils/sound';
import { CloudIntro } from './components/CloudIntro';

const App: React.FC = () => {
  const [channel, setChannel] = useState<Channel>(Channel.IDENTITY);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showStickyNav, setShowStickyNav] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize refs for each section
  const identityRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    [Channel.IDENTITY]: identityRef,
    [Channel.PROJECTS]: projectsRef,
    [Channel.EXPERIENCE]: experienceRef,
    [Channel.ABOUT]: aboutRef,
    [Channel.CONTACT]: contactRef,
  };

  // Initial Sound
  useEffect(() => {
    try {
      playPowerOn();
    } catch (e) {
      // Ignore autoplay errors
    }
  }, []);

  // Global click handler to resume AudioContext if suspended
  useEffect(() => {
    const handleGlobalClick = () => {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        playHover();
      }
    };
    window.addEventListener('click', handleGlobalClick, { once: true });
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const scrollToSection = useCallback((targetChannel: Channel) => {
    const section = sectionRefs[targetChannel as keyof typeof sectionRefs]?.current;
    if (section && scrollContainerRef.current) {
      playChannelSwitch();
      setIsMapOpen(false);
      setIsSwitching(true);
      setTimeout(() => {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Give time for scroll to happen before updating channel state to avoid flicker
        setTimeout(() => {
           setChannel(targetChannel);
           setIsSwitching(false);
        }, 800);
      }, 300);
    }
  }, []); 

  const handleNext = useCallback(() => {
    playClick();
    let next: Channel;
    if (channel === Channel.IDENTITY) next = Channel.PROJECTS;
    else if (channel === Channel.PROJECTS) next = Channel.EXPERIENCE;
    else if (channel === Channel.EXPERIENCE) next = Channel.ABOUT;
    else if (channel === Channel.ABOUT) next = Channel.CONTACT;
    else next = Channel.IDENTITY;
    scrollToSection(next);
  }, [channel, scrollToSection]);

  const handlePrev = useCallback(() => {
    playClick();
    let prev: Channel;
    if (channel === Channel.IDENTITY) prev = Channel.CONTACT;
    else if (channel === Channel.PROJECTS) prev = Channel.IDENTITY;
    else if (channel === Channel.EXPERIENCE) prev = Channel.PROJECTS;
    else if (channel === Channel.ABOUT) prev = Channel.EXPERIENCE;
    else prev = Channel.ABOUT;
    scrollToSection(prev);
  }, [channel, scrollToSection]);

  const handleOpenMap = () => {
    playClick();
    setIsMapOpen(true);
  };

  const handleChatToggle = () => {
    playClick();
    setIsChatOpen(!isChatOpen);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement instanceof HTMLInputElement || document.activeElement instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        handleNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        handlePrev();
      } else if (e.key === 'Enter') {
        handleOpenMap();
      } else if (e.key === 'Escape') {
        setIsMapOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPos = container.scrollTop;
      const height = container.clientHeight;
      const scrollMiddle = scrollPos + (height / 2);
      
      if (scrollPos > height * 0.5) {
        setShowStickyNav(true);
      } else {
        setShowStickyNav(false);
      }

      const channels = [
        Channel.IDENTITY,
        Channel.PROJECTS,
        Channel.EXPERIENCE,
        Channel.ABOUT,
        Channel.CONTACT
      ];

      for (const ch of channels) {
        const ref = sectionRefs[ch];
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollMiddle >= offsetTop && scrollMiddle < offsetTop + offsetHeight) {
            setChannel(ch);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden flex items-center justify-center selection:bg-yellow-400 selection:text-black">
      <CustomCursor />
      
      <div className="relative w-full h-full flex items-stretch">
        <div className="relative w-full h-full bg-[#d1d5db] p-1 md:p-4 border-[4px] md:border-[12px] border-black shadow-[inset_0_0_30px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden">
          
          {/* Sticky Nav - Only visible after intro */}
          {isIntroComplete && (
            <div 
              className={`absolute top-0 left-0 right-0 z-[80] flex items-start justify-center select-none pointer-events-none transition-transform duration-500 ease-in-out ${showStickyNav ? 'translate-y-0' : '-translate-y-24'}`}
            >
              <div className="mt-2 md:mt-4 pointer-events-auto bg-black/90 px-4 md:px-6 py-2 border-2 md:border-4 border-white/20 rounded-full backdrop-blur-md shadow-[0_4px_10px_rgba(0,0,0,0.5)] flex items-center gap-4 md:gap-6">
                <button 
                  onClick={handlePrev}
                  onMouseEnter={playHover}
                  className="pixel-text-white text-lg md:text-xl hover:text-yellow-400 transition-colors"
                >
                  &lt;
                </button>
                
                <button 
                  onClick={handleOpenMap}
                  onMouseEnter={playHover}
                  className="group flex flex-col items-center gap-1 min-w-[80px] md:min-w-[120px]"
                >
                  <span className="text-white text-[8px] md:text-xs tracking-[0.2em] uppercase animate-pulse font-bold hover:scale-110 transition-transform">PRESS START</span>
                </button>
                
                <button 
                  onClick={handleNext}
                  onMouseEnter={playHover}
                  className="pixel-text-white text-lg md:text-xl hover:text-yellow-400 transition-colors"
                >
                  &gt;
                </button>
              </div>
            </div>
          )}

          <div className="relative flex-1 bg-black rounded-lg overflow-hidden border-[4px] md:border-[10px] border-black shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
             <div 
               className="w-full h-full relative"
               style={{ 
                 filter: `contrast(1.1) saturate(1.2)`,
                 transition: 'filter 0.3s ease'
               }}
             >
                <div 
                  ref={scrollContainerRef}
                  className={`h-full w-full overflow-y-auto scroll-smooth scrollbar-hide transition-opacity duration-300 ${isSwitching ? 'opacity-0' : 'opacity-100'}`}
                >
                  <div ref={identityRef} className="w-full">
                    <IdentityChannel onStart={handleOpenMap} />
                    <div className="h-20 md:h-40 bg-gradient-to-b from-[#3a92ff] to-[#5c94fc]" />
                  </div>
                  
                  <div ref={projectsRef} className="w-full">
                    <ProjectsChannel />
                    <div className="h-20 md:h-40 bg-gradient-to-b from-[#5c94fc] to-[#000000]" />
                  </div>

                  <div ref={experienceRef} className="w-full">
                    <ExperienceChannel />
                    <div className="h-20 md:h-40 bg-gradient-to-b from-[#000000] to-[#000000]" />
                  </div>

                  <div ref={aboutRef} className="w-full">
                    <AboutChannel />
                    <div className="h-20 md:h-40 bg-gradient-to-b from-[#000000] to-[#c8f08f]" />
                  </div>

                  <div ref={contactRef} className="w-full">
                    <ContactChannel />
                  </div>
                </div>

                <MapNavigator 
                  isOpen={isMapOpen} 
                  onClose={() => setIsMapOpen(false)} 
                  onSelect={scrollToSection} 
                  currentChannel={channel}
                />

                <LoadingTransition active={isSwitching} />
                <CloudIntro onComplete={() => setIsIntroComplete(true)} />
                <CRTOverlay />
             </div>

             {/* Chat Toggle Button - Only visible after intro */}
             {isIntroComplete && (
               <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-[95] animate-in fade-in zoom-in duration-500">
                  <button 
                    onClick={handleChatToggle}
                    onMouseEnter={playHover}
                    className={`w-14 h-14 md:w-20 md:h-20 bg-zinc-400 border-4 ${isChatOpen ? 'border-green-500 bg-zinc-300' : 'border-black'} rounded-lg shadow-[4px_4px_0px_#000] md:shadow-[8px_8px_0px_#000] hover:scale-105 active:scale-95 transition-all flex items-center justify-center relative group overflow-hidden`}
                  >
                      {/* Robot Face Icon */}
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-8 h-5 md:w-10 md:h-6 bg-black rounded-t-sm flex justify-center items-center gap-1 md:gap-2 border-2 border-white/20">
                           <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full ${isChatOpen ? 'animate-ping' : ''}`} />
                           <div className={`w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full ${isChatOpen ? 'animate-ping delay-75' : ''}`} />
                        </div>
                        <div className="w-5 h-1.5 md:w-6 md:h-2 bg-black mt-[2px] rounded-b-sm" />
                      </div>
                  </button>
               </div>
             )}
          </div>
          
          <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.05)_0%,transparent_50%)] z-[60]" />
    </div>
  );
};

export default App;
