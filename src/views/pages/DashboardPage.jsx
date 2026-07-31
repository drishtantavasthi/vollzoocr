import React from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import DocumentCard from '../components/DocumentCard';
import EmptyState from '../components/EmptyState';

const DashboardPage = ({ onNavigate }) => {
  const { documents, stats } = useDocuments();

  const recentDocs = documents.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          Welcome to Vollzo OCR
        </h1>
        <p className="text-slate-400 text-lg">AI-powered document intelligence</p>
      </section>

      {/* Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Documents */}
        <div className="bg-[#0f172a]/80 backdrop-blur border border-white/[0.08] rounded-xl p-6 hover:-translate-y-1 transition-transform flex items-center space-x-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Total Documents</p>
            <p className="text-3xl font-bold text-white">{stats.totalDocuments || 0}</p>
          </div>
        </div>
        
        {/* Recent */}
        <div className="bg-[#0f172a]/80 backdrop-blur border border-white/[0.08] rounded-xl p-6 hover:-translate-y-1 transition-transform flex items-center space-x-4">
          <div className="p-3 bg-purple-500/20 rounded-lg">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <p className="text-slate-400 text-sm">Recent (7 days)</p>
            <p className="text-3xl font-bold text-white">{stats.recentCount || 0}</p>
          </div>
        </div>

        {/* AI Engine */}
        <div className="bg-[#0f172a]/80 backdrop-blur border border-white/[0.08] rounded-xl p-6 hover:-translate-y-1 transition-transform flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/20 rounded-lg">
            <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div>
            <p className="text-slate-400 text-sm">AI Engine</p>
            <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Gemini 2.5</p>
          </div>
        </div>
      </section>

      {/* Quick Action */}
      <section className="flex justify-center">
        <button 
          onClick={() => onNavigate('/upload')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
        >
          Start Scanning
        </button>
      </section>

      {/* Recent Documents */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-semibold text-white">Recent Documents</h2>
          <button onClick={() => onNavigate('/saved')} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View All</button>
        </div>
        
        {recentDocs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {recentDocs.map((doc, index) => (
              <DocumentCard key={doc.id} document={doc} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState 
            title="No recent documents"
            description="You haven't scanned any documents recently."
            icon={<svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>}
            actionLabel="Start Scanning"
            onAction={() => onNavigate('/upload')}
          />
        )}
      </section>
    </div>
  );
};

export default DashboardPage;
