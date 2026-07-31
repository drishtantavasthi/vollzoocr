import React from 'react';

export default function StatusBadge({ label, variant = 'default' }) {
  const variants = {
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    error: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    default: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  };

  const className = variants[variant] || variants.default;

  return (
    <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium border ${className}`}>
      {label}
    </span>
  );
}
