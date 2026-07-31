import React from 'react';

export default function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fadeIn">
      {icon ? (
        <div className="text-slate-600 mb-4 flex justify-center items-center">{icon}</div>
      ) : (
        <svg className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      <h3 className="text-xl font-semibold text-slate-300">{title}</h3>
      {description && (
        <p className="text-slate-500 mt-2 max-w-md mx-auto">{description}</p>
      )}
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary mt-6">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
