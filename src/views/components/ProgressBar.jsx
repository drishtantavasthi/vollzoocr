import React from 'react';

export default function ProgressBar({ progress = 0, isIndeterminate = false, label = 'Processing...', showPercentage = true }) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-medium text-slate-400">{label}</span>
        {showPercentage && !isIndeterminate && (
          <span className="text-sm text-slate-300 font-mono">{Math.round(progress)}%</span>
        )}
      </div>
      <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500 ${
            isIndeterminate ? 'w-[200%] animate-[shimmer_2s_infinite_linear] bg-[length:50%_100%]' : ''
          }`}
          style={{ width: isIndeterminate ? undefined : `${progress}%` }}
        />
      </div>
    </div>
  );
}
