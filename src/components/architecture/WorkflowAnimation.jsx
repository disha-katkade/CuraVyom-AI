import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, title: "Input Analysis", desc: "NLP parsing of research query" },
  { id: 2, title: "Task Planning", desc: "Decomposing into sub-goals" },
  { id: 3, title: "Data Retrieval", desc: "Parallel fetching from APIs" },
  { id: 4, title: "Evidence Scoring", desc: "Ranking by relevance & trust" },
  { id: 5, title: "Synthesis", desc: "Generating coherent insights" },
  { id: 6, title: "Report Generation", desc: "Formatting final output" },
];

export const WorkflowAnimation = () => {
  return (
    <div className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Sequential Processing Pipeline</h2>
          <p className="text-slate-400">How CuraVyom transforms raw queries into validated clinical insights</p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-teal-500/0 via-teal-500/20 to-teal-500/0 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex items-center gap-12 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="flex-1 text-center md:text-left group">
                  <div className={`md:flex flex-col ${index % 2 === 0 ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div className="inline-block px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-3 uppercase tracking-wider">
                      Step 0{step.id}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">{step.title}</h3>
                    <p className="text-slate-400 leading-relaxed max-w-md">{step.desc}</p>
                  </div>
                </div>

                {/* Center Node */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[#020617] border border-teal-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.1)]">
                  <div className="absolute inset-0 rounded-full bg-teal-500/10 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                  <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-sm border border-teal-500/50">
                    {step.id}
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
