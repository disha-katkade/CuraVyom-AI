import React from 'react';
import { cn } from './Button';

export const Card = ({ children, className, hover = true, ...props }) => {
  return (
    <div
      className={cn(
        "relative bg-brand-dark/40 backdrop-blur-md border border-brand-white/10 rounded-xl p-6 overflow-hidden",
        hover && "hover:border-brand-cyan/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,242,255,0.1)]",
        className
      )}
      {...props}
    >
      {/* Tech corner accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-brand-cyan/50 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-brand-cyan/50 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-brand-cyan/50 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-brand-cyan/50 rounded-br-lg" />
      
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={cn("mb-4", className)}>{children}</div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-xl font-bold text-brand-white", className)}>{children}</h3>
);

export const CardDescription = ({ children, className }) => (
  <p className={cn("text-sm text-brand-white/60", className)}>{children}</p>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("", className)}>{children}</div>
);
