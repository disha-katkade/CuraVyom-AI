import React from 'react';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const variants = {
  primary: "bg-gradient-to-r from-brand-cyan to-brand-neon text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(0,242,255,0.5)] border-none",
  secondary: "bg-brand-dark/50 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/10 hover:border-brand-cyan",
  outline: "bg-transparent border border-brand-white/20 text-brand-white hover:border-brand-white/50",
  ghost: "bg-transparent text-brand-white hover:bg-brand-white/5",
  glow: "bg-brand-dark border border-brand-cyan text-brand-cyan shadow-[0_0_10px_rgba(0,242,255,0.3)] hover:shadow-[0_0_20px_rgba(0,242,255,0.6)]"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
  icon: "p-2"
};

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  isLoading, 
  icon: Icon,
  ...props 
}) => {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {/* Hover effect for glass/tech feel */}
      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
      
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
      ) : Icon ? (
        <Icon className="w-5 h-5 mr-2" />
      ) : null}
      
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};
