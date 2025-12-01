
import React from 'react';
import { Clock, Zap, TrendingUp, DollarSign, XCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ComparisonCard = ({ title, items, type, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: type === 'bad' ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
    className={`relative p-8 rounded-3xl border ${
      type === 'bad' 
        ? 'bg-red-950/10 border-red-500/20' 
        : 'bg-cyan-950/10 border-cyan-500/20'
    } backdrop-blur-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}
  >
    {/* Background Glow */}
    <div className={`absolute inset-0 opacity-20 ${
      type === 'bad' 
        ? 'bg-gradient-to-br from-red-500/10 to-transparent' 
        : 'bg-gradient-to-bl from-cyan-500/10 to-transparent'
    }`} />
    
    <div className="relative z-10">
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6 ${
        type === 'bad' 
          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
          : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
      }`}>
        {type === 'bad' ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
        {type === 'bad' ? 'LEGACY PROCESS' : 'AGENTIC WORKFLOW'}
      </div>

      <h3 className="text-3xl font-bold text-white mb-8 font-display">{title}</h3>

      <ul className="space-y-6">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-4">
            <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              type === 'bad' ? 'bg-red-500/10 text-red-400' : 'bg-cyan-500/10 text-cyan-400'
            }`}>
              {type === 'bad' ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            </div>
            <div>
              <p className="text-white font-medium mb-1">{item.title}</p>
              <p className="text-sm text-slate-400">{item.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const StatItem = ({ icon: Icon, value, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 hover:bg-white/10 transition-all group"
  >
    <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-6 h-6 text-cyan-400" />
    </div>
    <div className="text-3xl font-bold text-white mb-1 font-display">{value}</div>
    <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
  </motion.div>
);

export const ProblemSolution = () => {
  return (
    <section className="py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            <span className="text-white">Evolution of </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Discovery
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light">
            Replace months of manual literature review with seconds of autonomous agentic reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 mb-24">
          <ComparisonCard 
            type="bad"
            title="Manual Research"
            delay={0.2}
            items={[
              { title: "Slow Synthesis", desc: "8-12 weeks to review 100+ papers manually." },
              { title: "Siloed Data", desc: "Disconnected insights from patents, trials, and journals." },
              { title: "Human Bias", desc: "Subjective interpretation of complex biological mechanisms." }
            ]}
          />
          <ComparisonCard 
            type="good"
            title="CuraVyom AI"
            delay={0.4}
            items={[
              { title: "Instant Analysis", desc: "2 weeks to synthesize 10,000+ sources." },
              { title: "Unified Intelligence", desc: "Knowledge graph connecting molecular pathways to market data." },
              { title: "Objective Scoring", desc: "Data-driven confidence ranking for every hypothesis." }
            ]}
          />
        </div>

      </div>
    </section>
  );
};
