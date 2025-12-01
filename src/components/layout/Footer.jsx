import React, { useState } from 'react';
import { config } from '../../config';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Mail, ArrowRight, Activity, Globe, Shield, Check, Loader2 } from 'lucide-react';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch(config.endpoints.subscribe, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setStatus('error');
    }
  };

  return (
    <footer className="relative bg-[#020617] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex flex-col items-start gap-4">
              <Link to="/" className="inline-block flex items-center gap-4 group">
                <div className="relative group perspective-1000">
                  <div className="relative w-12 h-12 flex items-center justify-center transform-style-3d transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-12">
                    {/* Outer Rotating Ring */}
                    <div className="absolute inset-0 rounded-xl border border-cyan-500/30 animate-[spin_10s_linear_infinite] group-hover:border-cyan-400/60 transition-colors" />
                    <div className="absolute inset-0 rounded-xl border border-blue-500/30 animate-[spin_15s_linear_infinite_reverse] scale-110 group-hover:border-blue-400/60 transition-colors" />
                    
                    {/* Glass Container */}
                    <div className="absolute inset-1 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-lg backdrop-blur-sm border border-white/10 shadow-[0_0_15px_rgba(6,182,212,0.2)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all duration-500 flex items-center justify-center overflow-hidden">
                      {/* Holographic Shine */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-shine" />
                      
                      {/* The Logo */}
                      <img src="/logo.png" alt="CuraVyom Logo" className="w-7 h-7 object-contain drop-shadow-[0_0_10px_rgba(6,182,212,0.8)] relative z-10" />
                    </div>
                    
                    {/* Glow Orb Behind */}
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full -z-10 group-hover:bg-cyan-400/30 transition-colors duration-500 animate-pulse-slow" />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <span className="text-2xl font-bold text-white tracking-tight font-display">
                    Cura<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vyom</span>
                  </span>
                  <span className="text-[10px] text-cyan-500/60 uppercase tracking-[0.2em] font-mono">AI</span>
                </div>
              </Link>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Accelerating drug repurposing through Agentic AI. Transforming 12 weeks of research into 2 weeks of actionable insights.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Status: Operational
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-500" />
              Platform
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/features" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Features</Link></li>
              <li><Link to="/architecture" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Architecture</Link></li>
              <li><Link to="/dashboard" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Live Dashboard</Link></li>
              <li><Link to="/demo" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Interactive Demo</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-500" />
              Company
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />About Team</Link></li>
              <li><Link to="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyan-400 transition-colors flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-500" />
              Connect
            </h4>
            <div className="flex gap-4 mb-6">
              <a href="https://www.linkedin.com/in/mr-jayeshmuley" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://github.com/jayesh3103" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:jayeshmuley2022@vitbhopal.ac.in" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group">
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
            
            {/* Newsletter Micro-interaction */}
            <form onSubmit={handleSubscribe} className="relative">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all pr-10 disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors disabled:opacity-50"
              >
                {status === 'loading' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : status === 'success' ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )}
              </button>
            </form>
            {status === 'success' && (
              <p className="text-xs text-green-400 mt-2 animate-fade-in">
                Thank you! You will receive updates shortly.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 mt-2 animate-fade-in">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">© 2025 CuraVyom AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <span className="text-xs text-slate-600">Designed for EY Techathon</span>
             <div className="h-3 w-[1px] bg-white/10" />
             <span className="text-xs font-mono text-cyan-900 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">v2.0.4-beta</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
