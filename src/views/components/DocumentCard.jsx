import React from 'react';

function formatRelativeTime(timestamp) {
  if (!timestamp) return '';
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return rtf.format(-diffInMinutes, 'minute');
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return rtf.format(-diffInHours, 'hour');
  
  return date.toLocaleDateString();
}

export default function DocumentCard({ document, onView, onDelete, index = 0 }) {
  const { id, data = {}, downloadURL, timestamp, fileName } = document;
  const dataKeys = Object.keys(data);
  const title = fileName || (dataKeys.length > 0 ? data[dataKeys[0]] : `Document #${id || 'New'}`);
  
  const previewKeys = dataKeys.slice(0, 3);

  return (
    <div 
      className="glass-card flex flex-col relative overflow-hidden animate-fadeIn hover:translate-y-[-2px] hover:shadow-lg transition duration-300 group"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-cyan-500" />
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start mb-4">
          <svg className="w-8 h-8 text-violet-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-base font-semibold text-slate-200 line-clamp-2" title={title}>{title}</h3>
        </div>
        
        <div className="flex-1 space-y-2 mb-4">
          {previewKeys.length > 0 ? (
            previewKeys.map(key => (
              <div key={key} className="text-sm flex flex-col">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wider">{key}</span>
                <span className="text-slate-300 truncate">{data[key]}</span>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-500 italic">No data available</div>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <span className="text-xs text-slate-500">{formatRelativeTime(timestamp)}</span>
          <div className="flex gap-2">
            {downloadURL && onView && (
              <button 
                onClick={() => onView(document)} 
                className="p-1.5 text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/10 rounded-md transition"
                title="View Document"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button 
                onClick={() => onDelete(document)} 
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition"
                title="Delete Document"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
