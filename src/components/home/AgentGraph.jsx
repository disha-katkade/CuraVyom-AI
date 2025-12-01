import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Database, FileSearch, Globe, Activity, Share2, Zap, Atom, Scan } from 'lucide-react';

const AgentNode = ({ icon: Icon, label, color, x, y, delay, isCenter }) => (
  <motion.div
    className={`absolute z-20 ${isCenter ? 'w-28 h-28' : 'w-20 h-20'}`}
    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    initial={{ scale: 0, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
  >
    <div className="relative w-full h-full group cursor-pointer flex items-center justify-center">
      {/* Tech Ring - Rotating Dashed Circle */}
      <div className="absolute inset-[-30%] pointer-events-none">
        <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" className={`${isCenter ? 'text-purple-500/30' : 'text-cyan-500/20'}`} />
        </svg>
      </div>
      
      {/* Counter-Rotating Ring for Center */}
      {isCenter && (
        <div className="absolute inset-[-45%] pointer-events-none">
          <svg className="w-full h-full animate-[spin_15s_linear_infinite_reverse]" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="20 20" className="text-blue-500/20" />
          </svg>
        </div>
      )}

      {/* Pulsing Corner Brackets */}
      <div className="absolute inset-[-10%] pointer-events-none">
        <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${isCenter ? 'border-purple-400' : 'border-cyan-400'} rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${isCenter ? 'border-purple-400' : 'border-cyan-400'} rounded-tr-lg opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${isCenter ? 'border-purple-400' : 'border-cyan-400'} rounded-bl-lg opacity-60 group-hover:opacity-100 transition-opacity`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${isCenter ? 'border-purple-400' : 'border-cyan-400'} rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity`} />
      </div>

      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 rounded-2xl ${color} opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-500 ${isCenter ? 'animate-pulse-slow' : ''}`} />
      
      {/* Node Container */}
      <div className={`relative w-full h-full rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-cyan-500/50 transition-all duration-300 overflow-hidden group-hover:scale-105`}>
        {/* Inner Gradient */}
        <div className={`absolute inset-0 opacity-10 ${color}`} />
        
        {/* Icon */}
        <Icon className={`${isCenter ? 'w-12 h-12' : 'w-8 h-8'} text-white relative z-10 group-hover:scale-110 transition-transform duration-300`} />
        
        {/* Scanning Line Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent translate-y-[-150%] group-hover:animate-scan" />
      </div>

      {/* Status Dot */}
      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${color} border-2 border-[#020617] shadow-lg animate-pulse`} />
    </div>

    {/* Label - Absolutely Positioned */}
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4">
      <span className={`text-xs font-bold text-cyan-100 bg-cyan-950/80 px-3 py-1.5 rounded-full border border-cyan-500/20 backdrop-blur-md tracking-wide uppercase shadow-lg whitespace-nowrap ${isCenter ? 'text-sm px-4 py-2 border-cyan-400/40' : ''}`}>
        {label}
      </span>
    </div>
  </motion.div>
);

// DOM-based pulse to avoid SVG aspect ratio distortion
const DataPulse = ({ start, end, delay, duration, color }) => (
  <motion.div
    className={`absolute w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px_currentColor] z-10`}
    initial={{ left: `${start.x}%`, top: `${start.y}%`, opacity: 0 }}
    animate={{ 
      left: [`${start.x}%`, `${end.x}%`], 
      top: [`${start.y}%`, `${end.y}%`],
      opacity: [0, 1, 1, 0]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "linear",
      delay: delay,
    }}
  />
);

export const AgentGraph = () => {
  // Coordinates in percentage (0-100)
  const center = { x: 50, y: 50 };
  const nodes = [
    { id: 'clinical', x: 20, y: 25, color: 'bg-blue-500', hex: '#3b82f6', icon: Activity, label: 'Clinical Trials' },
    { id: 'patent', x: 80, y: 25, color: 'bg-purple-500', hex: '#a855f7', icon: FileSearch, label: 'Patent Analysis' },
    { id: 'market', x: 20, y: 75, color: 'bg-emerald-500', hex: '#10b981', icon: Globe, label: 'Market Research' },
    { id: 'docs', x: 80, y: 75, color: 'bg-orange-500', hex: '#f97316', icon: Database, label: 'Internal Docs' },
  ];

  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
          <Scan className="w-3 h-3 animate-pulse" />
          Neural Orchestration
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
          <span className="text-white">The </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            Master Agent
          </span>
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
          Watch as our swarm intelligence decomposes complex queries into parallel research streams.
        </p>
      </div>

      <div className="relative h-[600px] max-w-6xl mx-auto bg-slate-950/50 rounded-[3rem] border border-white/5 backdrop-blur-sm overflow-hidden shadow-2xl group">
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-cyan-500/5 blur-3xl rounded-full opacity-20 pointer-events-none" />

        {/* SVG Layer for Connections (Non-scaling stroke for consistent width) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(6,182,212,0)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.5)" />
              <stop offset="100%" stopColor="rgba(6,182,212,0)" />
            </linearGradient>
          </defs>
          
          {nodes.map((node) => (
            <line
              key={node.id}
              x1={`${node.x}%`} y1={`${node.y}%`}
              x2={`${center.x}%`} y2={`${center.y}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="opacity-50"
            />
          ))}
        </svg>

        {/* DOM-based Data Pulses (No distortion) */}
        {nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {/* Incoming */}
            <DataPulse start={node} end={center} delay={i * 0.3} duration={2} color={node.hex} />
            <DataPulse start={node} end={center} delay={i * 0.3 + 1} duration={2} color={node.hex} />
            {/* Outgoing */}
            <DataPulse start={center} end={node} delay={i * 0.3 + 0.5} duration={2} color="#06b6d4" />
          </React.Fragment>
        ))}

        {/* Central Master Agent */}
        <AgentNode 
          icon={Brain} 
          label="Master Agent" 
          color="bg-purple-500" 
          x={50} 
          y={50}
          delay={0}
          isCenter={true}
        />

        {/* Worker Agents */}
        {nodes.map((node, i) => (
          <AgentNode 
            key={node.id}
            icon={node.icon} 
            label={node.label} 
            color={node.color} 
            x={node.x} 
            y={node.y}
            delay={0.2 + i * 0.1}
          />
        ))}

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyan-400/50 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%", 
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -20 + "%"], 
                opacity: [0, 0.8, 0] 
              }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
