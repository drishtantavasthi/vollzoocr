import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function Layout({ children, currentPath, onNavigate, pageTitle }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-[#f8fafc] font-sans selection:bg-violet-500/30">
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed top-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <Sidebar currentPath={currentPath} onNavigate={onNavigate} />
      
      <div className="ml-64 flex flex-col min-h-screen relative z-10">
        <Navbar title={pageTitle} />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto w-full animate-fadeIn">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
