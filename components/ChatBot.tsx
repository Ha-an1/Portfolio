
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Hello there! Ask me anything about Haani.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatSession = useRef<Chat | null>(null);

  // Initialize Gemini Chat
  useEffect(() => {
    if (isOpen && !chatSession.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSession.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: "You are a helpful portfolio assistant for a Computer Science student named Haani Behzad Kuniyil. Keep answers short, witty. Do not use markdown formatting like bold or italics.",
          },
        });
      } catch (error) {
        console.error("Failed to initialize AI", error);
        setMessages(prev => [...prev, { id: 'err', role: 'model', text: 'Connection Error.' }]);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession.current || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const result: GenerateContentResponse = await chatSession.current.sendMessage({ message: userMsg });
      const text = result.text || "...";
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: '...' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-20 right-2 md:bottom-28 md:right-8 z-[120] w-[calc(100%-1rem)] md:w-96 flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300 origin-bottom-right max-w-[400px]">
      
      {/* Game Boy Dialog Box Container */}
      <div className="bg-white border-[4px] md:border-[6px] border-black rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.5)] md:shadow-[8px_8px_0px_rgba(0,0,0,0.5)] p-1 overflow-hidden relative font-['Press_Start_2P']">
        
        {/* Double-line Border Effect (Inner) */}
        <div className="border-[2px] border-black rounded-sm h-[280px] md:h-[320px] flex flex-col relative">
          
          {/* Header / Close Button */}
          <div className="absolute top-2 right-2 z-20">
            <button 
              onClick={onClose} 
              className="bg-[#ff4444] text-white border-2 border-black px-2 py-1 text-[8px] font-bold shadow-[2px_2px_0px_#000] hover:bg-[#ff0000] hover:scale-105 active:scale-95 active:shadow-none transition-all"
            >
              [X]
            </button>
          </div>

          {/* Chat History Area */}
          <div 
            className="flex-1 overflow-y-auto p-3 md:p-4 scrollbar-hide space-y-3 md:space-y-4" 
            ref={scrollRef}
          >
            {messages.map((msg) => (
              <div key={msg.id} className={`text-[8px] md:text-[12px] leading-relaxed ${msg.role === 'user' ? 'text-gray-500 text-right' : 'text-black text-left'}`}>
                {msg.role === 'user' ? (
                   <span>{msg.text}</span>
                ) : (
                   <span>{msg.text}</span>
                )}
              </div>
            ))}
            {isLoading && (
               <div className="text-black text-[10px] md:text-[12px] animate-pulse">...</div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-2 bg-[#f0f0f0] border-t-[2px] border-black relative">
            <div className="flex items-center gap-2">
              <span className="text-black text-[10px] animate-pulse">▶</span>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 bg-transparent border-none outline-none text-black font-['Press_Start_2P'] text-[8px] md:text-[10px] placeholder-gray-400"
                placeholder="ASK HAANI..."
                autoFocus
              />
            </div>
            
            {/* Blinking Down Arrow (Waiting for input/next) */}
            <div className="absolute bottom-2 right-2 text-red-500 animate-bounce text-[10px]">
              ▼
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
