import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatInterface } from '../components/dashboard/ChatInterface';
import { ClinicalChart, ConfidenceRadar } from '../components/dashboard/DashboardWidgets';
import { Card } from '../components/ui/Card';
import { Bot, Sparkles, Activity, Cpu, Database, Globe, Zap, Shield, Search, FileText, ChevronRight } from 'lucide-react';

const AgentStatus = ({ icon: Icon, name, status, color, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/40 border border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
  >
    <div className={`w-8 h-8 rounded-lg ${color} bg-opacity-20 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-4 h-4 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div className="flex-1">
      <div className="text-xs font-bold text-slate-200">{name}</div>
      <div className="flex items-center gap-1.5 mt-0.5">
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`} />
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{status}</span>
      </div>
    </div>
    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-white transition-colors" />
  </motion.div>
);

const Demo = () => {
  const [activeTab, setActiveTab] = useState('visualization');
  const [agentStatuses, setAgentStatuses] = useState({
    'Master Orchestrator': 'Active',
    'Clinical Trials': 'Active',
    'Patent Analyst': 'Active',
    'Market Research': 'Active',
    'Regulatory Check': 'Active'
  });
  const [logs, setLogs] = useState([]);
  const [confidenceData, setConfidenceData] = useState(null);

  const handleLog = useCallback((log) => {
    const timestamp = new Date().toLocaleTimeString([], { hour12: false });
    // Extract log level if present, otherwise default to INFO
    const levelMatch = log.match(/^(INFO|WARN|ERROR|DEBUG)/);
    const level = levelMatch ? levelMatch[0] : 'INFO';
    const message = log.replace(/^(INFO|WARN|ERROR|DEBUG)/, '').trim();
    
    setLogs(prev => [{ timestamp, level, message }, ...prev].slice(0, 50));
  }, []);

  const handleResponse = useCallback((response) => {
    if (response.metadata && response.metadata.confidence_score) {
      // Transform confidence score into radar data
      // Assuming confidence_score is a dictionary or we generate mock data based on it
      const score = response.metadata.confidence_score;
      // Mock distribution based on the single score for now, or use detailed scores if available
      // If score is a number (0-100)
      const baseScore = typeof score === 'number' ? score : 85;
      
      setConfidenceData([
        { subject: 'Clinical', A: Math.min(150, baseScore + Math.random() * 20), fullMark: 150 },
        { subject: 'Patent', A: Math.min(150, baseScore + Math.random() * 20 - 10), fullMark: 150 },
        { subject: 'Market', A: Math.min(150, baseScore + Math.random() * 30 - 15), fullMark: 150 },
        { subject: 'Safety', A: Math.min(150, baseScore + Math.random() * 10), fullMark: 150 },
        { subject: 'Efficacy', A: Math.min(150, baseScore + Math.random() * 20), fullMark: 150 },
        { subject: 'Novelty', A: Math.min(150, baseScore + Math.random() * 40 - 20), fullMark: 150 },
      ]);
    }
  }, []);

  const handleAgentUpdate = useCallback((updates) => {
    setAgentStatuses(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <div className="relative min-h-screen pt-20 pb-10 overflow-hidden bg-[#020617] flex flex-col">
      {/* Bio-Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      {/* Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex-1 max-w-[1600px] mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar: Agent Swarm Status */}
        <div className="lg:w-64 flex flex-col gap-4 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-slate-950/50 border border-white/10 backdrop-blur-md"
          >
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Agent Swarm</h3>
            </div>
            <div className="space-y-2">
              {Object.entries(agentStatuses).map(([name, status], index) => (
                <AgentStatus 
                  key={name}
                  icon={
                    name === 'Master Orchestrator' ? Bot :
                    name === 'Clinical Trials' ? Activity :
                    name === 'Patent Analyst' ? FileText :
                    name === 'Market Research' ? Globe : Shield
                  } 
                  name={name} 
                  status={status} 
                  color={
                    name === 'Master Orchestrator' ? 'bg-cyan-500' :
                    name === 'Clinical Trials' ? 'bg-blue-500' :
                    name === 'Patent Analyst' ? 'bg-purple-500' :
                    name === 'Market Research' ? 'bg-green-500' : 'bg-red-500'
                  } 
                  delay={0.1 * (index + 1)} 
                />
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="p-4 rounded-xl bg-slate-950/50 border border-white/10 backdrop-blur-md flex-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Context Memory</h3>
            </div>
            <div className="space-y-3">
              <div className="p-2 rounded bg-white/5 border border-white/5 text-xs text-slate-400">
                <span className="text-purple-400 font-mono block mb-1">SESSION_ID</span>
                #8492-ALPHA-X
              </div>
              <div className="p-2 rounded bg-white/5 border border-white/5 text-xs text-slate-400">
                <span className="text-purple-400 font-mono block mb-1">FOCUS_MOLECULE</span>
                Metformin (C4H11N5)
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center: Main Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex flex-col h-[80vh]"
        >
          <div className="relative h-full rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_0_40px_rgba(8,145,178,0.1)] bg-slate-950/80 backdrop-blur-xl group">
            {/* Holographic Border Effect */}
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/30 rounded-tl-2xl pointer-events-none" />
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/30 rounded-tr-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/30 rounded-bl-2xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/30 rounded-br-2xl pointer-events-none" />
            
            <ChatInterface 
              onAgentUpdate={handleAgentUpdate} 
              onLog={handleLog}
              onResponse={handleResponse}
            />
          </div>
        </motion.div>

        {/* Right Sidebar: Live Visualization */}
        <div className="lg:w-80 flex flex-col gap-4 shrink-0">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between p-1 bg-slate-900/50 rounded-lg border border-white/10 mb-2"
          >
            <button 
              onClick={() => setActiveTab('visualization')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'visualization' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Visuals
            </button>
            <button 
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'logs' ? 'bg-cyan-500 text-black shadow-lg' : 'text-slate-400 hover:text-white'}`}
            >
              Sys Logs
            </button>
          </motion.div>

          <AnimatePresence mode="wait">
            {activeTab === 'visualization' ? (
              <motion.div
                key="viz"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 h-full overflow-y-auto pr-1 scrollbar-none"
              >
                <Card className="p-4 bg-slate-900/50 border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <h3 className="text-xs font-bold text-white uppercase">Efficacy Projection</h3>
                  </div>
                  <div className="h-60">
                    <ClinicalChart />
                  </div>
                </Card>

                <Card className="p-4 bg-slate-900/50 border-white/10 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <h3 className="text-xs font-bold text-white uppercase">Confidence Score</h3>
                  </div>
                  <div className="h-60 flex items-center justify-center">
                    <ConfidenceRadar data={confidenceData} />
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="logs"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="h-full bg-black/40 rounded-xl border border-white/10 p-4 font-mono text-[10px] text-green-400 overflow-y-auto"
              >
                <div className="space-y-1 opacity-80">
                  {logs.length === 0 ? (
                    <p className="text-slate-500 italic">Waiting for system logs...</p>
                  ) : (
                    logs.map((log, i) => (
                      <p key={i}>
                        <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                        <span className={`${
                          log.level === 'INFO' ? 'text-blue-400' :
                          log.level === 'WARN' ? 'text-yellow-400' :
                          log.level === 'ERROR' ? 'text-red-400' : 'text-purple-400'
                        }`}>{log.level}</span>{' '}
                        {log.message}
                      </p>
                    ))
                  )}
                  <p className="animate-pulse">_</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Demo;
