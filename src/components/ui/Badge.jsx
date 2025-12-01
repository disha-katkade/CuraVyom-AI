import React from 'react';
import { cn } from './Button';

const variants = {
  default: "bg-brand-white/10 text-brand-white border-brand-white/20",
  success: "bg-brand-neon/10 text-brand-neon border-brand-neon/30",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  danger: "bg-red-500/10 text-red-500 border-red-500/30",
  info: "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/30",
};

export const Badge = ({ children, variant = 'default', className, ...props }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
