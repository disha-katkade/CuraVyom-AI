import React from 'react';
import { motion } from 'framer-motion';
import { ClinicalChart, ConfidenceRadar, PatentBarChart } from '../components/dashboard/DashboardWidgets';
import { Card } from '../components/ui/Card';
import { Activity, FileText, AlertCircle, CheckCircle, Zap, Database, Globe, Cpu } from 'lucide-react';

const MetricCard = ({ icon: Icon, label, value, trend, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <Card className="p-6 relative overflow-hidden group hover:border-teal-500/30 transition-all duration-300">
      <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color.replace('bg-', 'text-')}`}>
        <Icon className="w-24 h-24" />
      </div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform`}>
            <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-900/50 px-2 py-1 rounded-full border border-white/5">
            {trend}
          </span>
        </div>
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-sm text-slate-400 font-medium">{label}</p>
      </div>
      {/* Animated Glow */}
      <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${color} opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity`} />
    </Card>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-[#020617]">
      {/* Bio-Tech Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-mono text-teal-400 uppercase tracking-widest">Live System Status: ONLINE</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-display">Mission Control</h1>
            <p className="text-slate-400">Active Analysis: <span className="text-teal-400 font-mono font-bold">Metformin (C4H11N5)</span></p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex gap-2"
          >
            <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 flex items-center gap-3">
              <Cpu className="w-4 h-4 text-blue-400" />
              <div className="text-xs">
                <div className="text-slate-500 uppercase">CPU Load</div>
                <div className="text-white font-mono">12%</div>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 flex items-center gap-3">
              <Database className="w-4 h-4 text-purple-400" />
              <div className="text-xs">
                <div className="text-slate-500 uppercase">Tokens</div>
                <div className="text-white font-mono">8.4k/s</div>
              </div>
            </div>
            <div className="px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 flex items-center gap-3">
              <Globe className="w-4 h-4 text-green-400" />
              <div className="text-xs">
                <div className="text-slate-500 uppercase">Latency</div>
                <div className="text-white font-mono">24ms</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            icon={Activity} 
            label="Clinical Trials Scanned" 
            value="50,240" 
            trend="+12% this week" 
            color="bg-blue-500"
            delay={0.1}
          />
          <MetricCard 
            icon={FileText} 
            label="Patents Analyzed" 
            value="12,890" 
            trend="Updated 2h ago" 
            color="bg-purple-500"
            delay={0.2}
          />
          <MetricCard 
            icon={CheckCircle} 
            label="Confidence Score" 
            value="94.2%" 
            trend="High Potential" 
            color="bg-teal-500"
            delay={0.3}
          />
          <MetricCard 
            icon={AlertCircle} 
            label="Risk Factor" 
            value="Low" 
            trend="Safety Profile: A" 
            color="bg-green-500"
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column: Charts */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Clinical Efficacy Projection
                  </h3>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs text-slate-400">Metformin</span>
                    <span className="w-3 h-3 rounded-full bg-slate-600 ml-2" />
                    <span className="text-xs text-slate-400">Baseline</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ClinicalChart />
                </div>
              </Card>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-md h-full">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    IP Landscape
                  </h3>
                  <div className="h-[200px]">
                    <PatentBarChart />
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Card className="p-6 bg-slate-900/50 border-white/10 backdrop-blur-md h-full">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-teal-400" />
                    Multi-Dimensional Score
                  </h3>
                  <div className="h-[200px] flex items-center justify-center">
                    <ConfidenceRadar />
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Alerts & Status */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="bg-slate-900/50 border-white/10 backdrop-blur-md">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-orange-400" />
                    Live Intelligence Feed
                  </h3>
                  <div className="space-y-4">
                    {[
                      { title: "New Clinical Trial Published", desc: "Phase 3 results for Metformin in Alzheimer's patients show promising cognitive retention.", time: "2m ago", type: "success" },
                      { title: "Patent Application Detected", desc: "Competitor filed for 'Biguanide derivatives in CNS disorders'.", time: "15m ago", type: "warning" },
                      { title: "Market Shift", desc: "FDA updates guidelines for repurposing generic drugs.", time: "1h ago", type: "info" },
                      { title: "System Update", desc: "Agent Core v2.0.4 deployed successfully with enhanced reasoning capabilities.", time: "2h ago", type: "success" }
                    ].map((alert, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${
                          alert.type === 'success' ? 'bg-green-400' : 
                          alert.type === 'warning' ? 'bg-orange-400' : 'bg-blue-400'
                        }`} />
                        <div>
                          <h4 className="font-bold text-slate-200 text-sm">{alert.title}</h4>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{alert.desc}</p>
                          <span className="text-[10px] text-slate-500 font-mono mt-2 block">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
