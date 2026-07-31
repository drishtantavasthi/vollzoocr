import React from 'react';

export default function Navbar({ title = 'Dashboard' }) {
  return (
    <header className="sticky top-0 z-10 h-16 flex items-center justify-between px-6 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div>
        <h2 className="text-lg font-semibold text-slate-200">{title}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-slate-400 hover:text-slate-200 transition-colors relative">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-violet-500 rounded-full border border-[#0f172a]"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 cursor-pointer hover:brightness-110 transition">
          <span className="text-xs font-bold text-white">V</span>
        </div>
      </div>
    </header>
  );
}
