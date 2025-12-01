import React from 'react';
import { Brain, Search, FileText, ShieldCheck, Zap, Layers, Database, BarChart } from 'lucide-react';
import { FeatureCard } from '../components/features/FeatureCard';
import { Terminal } from '../components/features/Terminal';

const features = [
  {
    icon: Brain,
    title: "Master Agent Orchestration",
    description: "A central intelligence that decomposes complex research queries into sub-tasks for specialized worker agents."
  },
  {
    icon: Search,
    title: "Automated Evidence Synthesis",
    description: "Scans millions of clinical trials and patents to find hidden connections and repurposing opportunities."
  },
  {
    icon: ShieldCheck,
    title: "Patent & Regulatory Analysis",
    description: "Real-time cross-referencing with global patent databases to ensure freedom to operate."
  },
  {
    icon: BarChart,
    title: "Confidence Scoring",
    description: "Every insight is ranked with a confidence score based on evidence quality and source reliability."
  },
  {
    icon: FileText,
    title: "Auto-Generated Reports",
    description: "Export presentation-ready PDF and Excel reports with a single click."
  },
  {
    icon: Database,
    title: "Multi-Source Integration",
    description: "Connects to PubMed, ClinicalTrials.gov, USPTO, and internal enterprise knowledge bases."
  }
];

const Features = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#020617]">
      {/* Bio-Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
         <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/30 border border-teal-500/20 text-teal-400 text-xs font-mono tracking-widest uppercase mb-6 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Clinical Intelligence Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight font-display">
            <span className="text-white">Precision Medicine,</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-500">
              Accelerated by AI.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            Synthesizing millions of clinical data points to identify <span className="text-teal-400 font-medium">repurposing candidates</span> with unprecedented accuracy.
          </p>
        </div>

        {/* Terminal Demo Section */}
        <div className="mb-40 relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase">Live System Activity</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Watch the Agents Think</h2>
            <p className="text-white/50 max-w-xl mx-auto">Real-time orchestration of clinical, patent, and market analysis.</p>
          </div>
          <Terminal />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className={index % 3 === 1 ? "lg:translate-y-12" : ""}>
              <FeatureCard 
                {...feature}
                delay={index * 0.1}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
