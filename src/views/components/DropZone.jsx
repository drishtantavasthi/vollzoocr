import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function DropZone({ onFilesSelected, acceptedTypes = { 'application/pdf': ['.pdf'] }, disabled = false, multiple = true }) {
  const onDrop = useCallback(acceptedFiles => {
    if (onFilesSelected) {
      onFilesSelected(acceptedFiles);
    }
  }, [onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes,
    disabled,
    multiple
  });

  return (
    <div
      {...getRootProps()}
      className={`glass-card p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 border-2 border-dashed ${
        isDragActive ? 'border-violet-500/50 bg-violet-500/5' : 'border-white/10 hover:border-slate-600 hover:bg-slate-800/30'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-16 h-16 mb-4 transition-colors duration-300 ${isDragActive ? 'text-violet-400' : 'text-slate-500'}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
      </svg>
      <p className="text-lg font-medium text-slate-300 mb-1">
        {isDragActive ? 'Drop files now' : 'Drag & drop PDFs here'}
      </p>
      <p className="text-sm text-slate-500">
        or click to browse
      </p>
    </div>
  );
}
