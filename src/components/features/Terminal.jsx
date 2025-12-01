import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';

const logs = [
  { type: 'info', text: 'Initializing Master Agent Protocol v2.0...' },
  { type: 'success', text: 'Connection established with Clinical Trials Database.' },
  { type: 'info', text: 'Scanning for molecule: Metformin' },
  { type: 'warning', text: 'Found 12,403 potential matches in patent database.' },
  { type: 'info', text: 'Deploying Worker Agents: [Clinical, Patent, Market]' },
  { type: 'success', text: 'Clinical Agent: Retrieved 45 relevant trials.' },
  { type: 'success', text: 'Patent Agent: Analyzed 150 recent filings.' },
  { type: 'info', text: 'Synthesizing evidence...' },
  { type: 'success', text: 'Cross-referencing complete. Confidence Score: 94%' },
  { type: 'info', text: 'Generating report...' },
];

export const Terminal = () => {
  const [lines, setLines] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setLines(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        // Reset for loop effect
        setTimeout(() => {
          setLines([]);
          currentIndex = 0;
        }, 3000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  return (
    <div className="relative w-full max-w-4xl mx-auto group">
      {/* Clinical Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/20 to-blue-600/20 rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-[#020617] rounded-xl border border-teal-500/20 shadow-2xl overflow-hidden font-mono text-sm backdrop-blur-xl">
        {/* Header */}
        <div className="bg-slate-900/50 px-4 py-3 flex items-center justify-between border-b border-teal-500/10 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            </div>
            <div className="h-4 w-[1px] bg-white/5" />
            <span className="text-teal-400/80 text-xs flex items-center gap-2 uppercase tracking-widest font-semibold">
              <TerminalIcon className="w-3 h-3" /> 
              Bio-Informatics Engine v4.1
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-[10px] text-teal-500/80 font-medium tracking-wider">PROCESSING</span>
          </div>
        </div>

        {/* Data Stream Body */}
        <div 
          ref={scrollRef}
          className="p-6 h-[400px] overflow-y-auto space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-teal-900/50 scrollbar-track-transparent relative z-10"
        >
          {lines.map((line, index) => (
            <div key={index} className="flex gap-4 animate-in fade-in slide-in-from-left-2 duration-300 group/line border-l-2 border-transparent hover:border-teal-500/30 pl-2 transition-colors">
              <span className="text-slate-600 select-none font-light text-xs pt-0.5">{new Date().toLocaleTimeString([], {hour12: false})}</span>
              <div className="flex flex-col">
                <span className={`font-medium tracking-wide text-sm ${
                  line.type === 'success' ? 'text-teal-400' :
                  line.type === 'warning' ? 'text-amber-400' :
                  line.type === 'error' ? 'text-red-400' :
                  'text-slate-300'
                }`}>
                  {line.text}
                </span>
                {/* Simulated Metadata */}
                <span className="text-[10px] text-slate-600 font-mono mt-0.5 opacity-0 group-hover/line:opacity-100 transition-opacity">
                  ID: {Math.random().toString(36).substr(2, 8).toUpperCase()} • LATENCY: {Math.floor(Math.random() * 20)}ms
                </span>
              </div>
            </div>
          ))}
          {lines.length === 0 && (
            <div className="flex items-center justify-center h-full text-teal-500/20 animate-pulse tracking-widest text-xs">
              INITIALIZING SEQUENCING PROTOCOLS...
            </div>
          )}
        </div>
        
        {/* Footer Status Bar */}
        <div className="bg-slate-950/50 border-t border-teal-500/10 px-4 py-2 flex justify-between items-center text-[10px] text-slate-500 font-mono">
          <div className="flex gap-4">
            <span>CPU: 12%</span>
            <span>MEM: 64GB</span>
          </div>
          <span>SECURE CONNECTION ESTABLISHED</span>
        </div>
      </div>
    </div>
  );
};
