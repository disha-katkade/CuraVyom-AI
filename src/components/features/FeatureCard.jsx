import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

export const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Card className="h-full relative overflow-hidden bg-slate-900/40 backdrop-blur-xl border-white/5 hover:border-teal-500/30 transition-all duration-500 group-hover:-translate-y-1">
        {/* Clinical Accent Line */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative z-10 p-2">
          <div className="w-12 h-12 rounded-lg bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/10 group-hover:border-teal-500/30 transition-colors duration-500">
            <Icon className="w-6 h-6 text-teal-400 group-hover:scale-110 transition-transform duration-500" />
          </div>
          
          <h3 className="text-lg font-semibold text-white mb-3 tracking-tight group-hover:text-teal-400 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors duration-300">
            {description}
          </p>
        </div>
        
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
      </Card>
    </motion.div>
  );
};
