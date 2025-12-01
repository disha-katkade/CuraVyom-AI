import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Activity, Cpu, Network, FileText, BarChart3, MessageSquare, ChevronRight } from 'lucide-react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';
import { Button } from '../ui/Button';
import { cn } from '../ui/Button';

const navItems = [
  { name: 'Features', path: '/features', icon: Cpu },
  { name: 'Architecture', path: '/architecture', icon: Network },
  { name: 'Use Case', path: '/use-case', icon: Activity },
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        scrolled || isOpen
          ? "bg-[#020617]/80 backdrop-blur-xl border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "bg-transparent border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
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
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white tracking-tight font-display">
                Cura<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Vyom</span>
              </span>
              <span className="text-[10px] text-cyan-500/60 uppercase tracking-[0.2em] font-mono">AI</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/5 backdrop-blur-md mr-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 relative group overflow-hidden",
                    location.pathname === item.path 
                      ? "text-white bg-white/10 shadow-inner" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon className={cn("w-4 h-4 transition-colors", location.pathname === item.path ? "text-cyan-400" : "text-slate-500 group-hover:text-cyan-400")} />
                  {item.name}
                  {location.pathname === item.path && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full opacity-50" />
                  )}
                </Link>
              ))}
            </div>
            
            <SignedIn>
              <Link to="/demo">
                <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_50%,#00000000_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                    <MessageSquare className="w-4 h-4 mr-2 text-cyan-400" />
                    Try Demo
                    <ChevronRight className="w-3 h-3 ml-1 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </span>
                </button>
              </Link>
            </SignedIn>

            <div className="ml-4 flex items-center gap-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#06b6d4_50%,#00000000_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-3xl transition-all group-hover:bg-slate-900">
                      Sign In to Access
                      <ChevronRight className="w-3 h-3 ml-1 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </span>
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border border-white/10"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-white/10 absolute top-20 left-0 right-0 h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "p-4 rounded-xl text-base font-medium transition-all flex items-center gap-4 border border-transparent",
                  location.pathname === item.path
                    ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white"
                )}
              >
                <div className={cn("p-2 rounded-lg", location.pathname === item.path ? "bg-cyan-500/20" : "bg-white/5")}>
                  <item.icon className="w-5 h-5" />
                </div>
                {item.name}
              </Link>
            ))}
            <div className="pt-6 px-2">
              <Link to="/demo" onClick={() => setIsOpen(false)}>
                <Button className="w-full py-6 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 border-none shadow-[0_0_20px_rgba(6,182,212,0.3)]" variant="primary" icon={MessageSquare}>
                  Try Interactive Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
