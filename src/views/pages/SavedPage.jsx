import React, { useState, useEffect } from 'react';
import { useDocuments } from '../../hooks/useDocuments';
import DocumentCard from '../components/DocumentCard';
import EmptyState from '../components/EmptyState';
import { showToast } from '../components/Toast';

const SavedPage = ({ onNavigate }) => {
  const { documents, deleteDocument, loadDocuments } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleDelete = (id) => {
    deleteDocument(id);
    showToast.success('Document deleted');
  };

  const handleView = (doc) => {
    if (doc.url) {
      window.open(doc.url, '_blank');
    }
  };

  const filteredDocs = documents.filter(doc => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    
    // Simple search in data values
    return Object.values(doc.data || {}).some(val => 
      String(val).toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-white">Saved Documents</h1>
          <span className="bg-slate-800 text-slate-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-700">
            {documents.length}
          </span>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-[#0f172a] border border-slate-700 rounded-xl text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {documents.length === 0 ? (
        <div className="pt-12">
          <EmptyState
            title="No saved documents yet"
            description="Start scanning documents to build your digital archive."
            icon={<svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
            actionLabel="Start Scanning"
            onAction={() => onNavigate('/upload')}
          />
        </div>
      ) : filteredDocs.length === 0 ? (
        <div className="pt-12">
          <EmptyState
            title="No results found"
            description={`No documents match your search for "${searchQuery}".`}
            icon={<svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDocs.map((doc, index) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onView={() => handleView(doc)}
              onDelete={() => handleDelete(doc.id)}
              index={index}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPage;
