import React from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Globe, Brain, User, FileText, ArrowRight } from 'lucide-react';
import { Card } from '../ui/Card';

const Node = ({ icon: Icon, label, subtext, delay, isActive }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="flex flex-col items-center text-center z-10 group relative"
  >
    {/* Pulsing Background */}
    <div className={`absolute inset-0 bg-blue-500/20 blur-xl rounded-full transition-opacity duration-500 ${isActive ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'}`} />
    
    <div className={`w-24 h-24 rounded-2xl bg-slate-900/90 border flex items-center justify-center mb-4 backdrop-blur-xl transition-all duration-500 relative z-10 ${isActive ? 'border-blue-400 shadow-[0_0_50px_rgba(59,130,246,0.4)] scale-110' : 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)] group-hover:border-blue-400 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]'}`}>
      <Icon className={`w-10 h-10 transition-transform duration-500 ${isActive ? 'text-blue-400 scale-110' : 'text-blue-500/70 group-hover:text-blue-400 group-hover:scale-110'}`} />
      
      {/* Status Indicator */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-green-400 animate-ping' : 'bg-slate-600'}`} />
      </div>
    </div>
    
    <h4 className={`font-bold text-sm tracking-wide mb-1 transition-colors ${isActive ? 'text-blue-400' : 'text-white'}`}>{label}</h4>
    <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{subtext}</p>
  </motion.div>
);

const FlowArrow = ({ delay, rotate = 0 }) => (
  <motion.div
    initial={{ opacity: 0, pathLength: 0 }}
    whileInView={{ opacity: 1, pathLength: 1 }}
    transition={{ duration: 1, delay }}
    viewport={{ once: true }}
    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    style={{ transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
  >
    <div className="relative">
       <div className="absolute inset-0 bg-blue-500/50 blur-md" />
       <ArrowRight className="w-8 h-8 text-blue-400 animate-pulse relative z-10" />
    </div>
  </motion.div>
);

export const ArchitectureDiagram = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative py-24 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center relative z-10">
          {/* Layer 1: User Input */}
          <div className="flex flex-col gap-12 items-center relative z-20">
            <Node 
              icon={User} 
              label="Clinician Input" 
              subtext="Natural Language Query" 
              delay={0} 
              isActive={activeStep === 0}
            />
          </div>

          {/* Connector 1 */}
          <div className="hidden md:block relative h-full w-full">
            <svg className="absolute top-1/2 left-0 w-full h-12 -translate-y-1/2 overflow-visible">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="50%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle 
                cx="0" cy="50%" r="4" fill="#60A5FA"
                animate={{ cx: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.rect 
                x="0" y="45%" width="40%" height="10%" fill="url(#grad1)"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ mixBlendMode: 'screen' }}
              />
            </svg>
          </div>

          {/* Layer 2: Orchestration */}
          <div className="flex flex-col gap-12 items-center relative z-20">
            <Node 
              icon={Brain} 
              label="Master Orchestrator" 
              subtext="Task Decomposition & Planning" 
              delay={0.2} 
              isActive={activeStep === 1}
            />
          </div>

          {/* Connector 2 (Branching) */}
          <div className="hidden md:block relative h-[400px] w-full">
            <svg className="absolute top-1/2 left-0 w-full h-full -translate-y-1/2 overflow-visible">
              {/* Common Start Point */}
              <circle cx="0" cy="200" r="4" fill="#60A5FA">
                <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Top Branch */}
              <path d="M0,200 C60,200 60,50 120,50" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle r="3" fill="#2DD4BF"
                animate={{ offsetDistance: ["0%", "100%"] }}
                style={{ offsetPath: "path('M0,200 C60,200 60,50 120,50')" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              {/* Top Endpoint */}
              <circle cx="120" cy="50" r="4" fill="#2DD4BF" className="animate-pulse" />
              <circle cx="120" cy="50" r="8" fill="#2DD4BF" opacity="0.2">
                <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* Middle Branch */}
              <line x1="0" y1="200" x2="120" y2="200" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle cx="0" cy="200" r="3" fill="#60A5FA"
                animate={{ cx: ["0", "120"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
              />
              {/* Middle Endpoint */}
              <circle cx="120" cy="200" r="4" fill="#60A5FA" className="animate-pulse" />
              <circle cx="120" cy="200" r="8" fill="#60A5FA" opacity="0.2">
                <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" begin="0.5s" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" begin="0.5s" />
              </circle>

              {/* Bottom Branch */}
              <path d="M0,200 C60,200 60,350 120,350" fill="none" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
              <motion.circle r="3" fill="#A855F7"
                animate={{ offsetDistance: ["0%", "100%"] }}
                style={{ offsetPath: "path('M0,200 C60,200 60,350 120,350')" }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              {/* Bottom Endpoint */}
              <circle cx="120" cy="350" r="4" fill="#A855F7" className="animate-pulse" />
              <circle cx="120" cy="350" r="8" fill="#A855F7" opacity="0.2">
                <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" begin="1s" />
                <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
              </circle>
            </svg>
          </div>

          {/* Layer 3: Worker Agents */}
          <div className="flex flex-col gap-20 relative z-20">
            <Node 
              icon={Globe} 
              label="Web Search Agent" 
              subtext="Real-time Literature" 
              delay={0.4} 
              isActive={activeStep === 2}
            />
            <Node 
              icon={Database} 
              label="Clinical Agent" 
              subtext="Trial Database Analysis" 
              delay={0.5} 
              isActive={activeStep === 2}
            />
            <Node 
              icon={Server} 
              label="Patent Agent" 
              subtext="IP Landscape Check" 
              delay={0.6} 
              isActive={activeStep === 2}
            />
          </div>
        </div>

        {/* Bottom Layer: Output */}
        <div className="mt-24 flex justify-center relative z-20">
           <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            viewport={{ once: true }}
            className="w-full max-w-4xl"
          >
            <Card className={`bg-slate-900/80 border-blue-500/20 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500 ${activeStep === 3 ? 'border-blue-400 shadow-[0_0_60px_rgba(59,130,246,0.2)]' : ''}`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500" />
              <div className="flex items-center gap-6 mb-8 border-b border-white/5 pb-6 pt-6 px-8">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <FileText className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Synthesized Intelligence Output</h3>
                  <p className="text-sm text-slate-400">Final Report Generation & Validation</p>
                </div>
                <div className="ml-auto flex gap-2">
                   <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono">VERIFIED</div>
                   <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">PDF READY</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center px-8 pb-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors group">
                  <div className="text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">98.2%</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Confidence Score</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-teal-500/30 transition-colors group">
                  <div className="text-4xl font-bold text-teal-400 mb-2 group-hover:scale-110 transition-transform">1,240</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Data Points Analyzed</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-colors group">
                  <div className="text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">1.8s</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Processing Time</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
