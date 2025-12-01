import React from 'react';
import { ArchitectureDiagram } from '../components/architecture/ArchitectureDiagram';
import { WorkflowAnimation } from '../components/architecture/WorkflowAnimation';

const Architecture = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#020617]">
       {/* Bio-Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s' }} />
         <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/30 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            System Architecture v2.0
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight font-display">
            <span className="text-white">Event-Driven</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400"> Intelligence.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            A scalable, multi-agent orchestration layer designed for <span className="text-blue-400 font-medium">high-throughput</span> drug discovery and validation.
          </p>
        </div>

        <ArchitectureDiagram />
        <WorkflowAnimation />
      </div>
    </div>
  );
};

export default Architecture;
