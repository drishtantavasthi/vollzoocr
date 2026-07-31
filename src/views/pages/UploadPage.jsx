import React, { useState, useEffect } from 'react';
import { useOCR } from '../../hooks/useOCR';
import DropZone from '../components/DropZone';
import ProgressBar from '../components/ProgressBar';

const UploadPage = ({ onNavigate }) => {
  const { processFiles, isProcessing, result, error, reset } = useOCR();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [instructions, setInstructions] = useState('');

  useEffect(() => {
    if (result) {
      onNavigate('/review');
    }
  }, [result, onNavigate]);

  const handleFilesSelected = (files) => {
    setSelectedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRunOCR = () => {
    if (selectedFiles.length > 0) {
      processFiles(selectedFiles, instructions);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-slideUp">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">Upload Documents</h1>
        <p className="text-slate-400">Upload your images or PDFs to extract data using AI.</p>
      </div>

      <DropZone onFilesSelected={handleFilesSelected} disabled={isProcessing} multiple={true} />

      {selectedFiles.length > 0 && !isProcessing && (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            {selectedFiles.map((file, i) => (
              <div key={i} className="bg-[#1e293b] border border-slate-700 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="text-sm text-slate-300 truncate max-w-[150px]">{file.name}</span>
                <button onClick={() => removeFile(i)} className="text-slate-500 hover:text-red-400 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Custom Instructions (Optional)</label>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="What should we extract? e.g., 'Extract the invoice number and total amount'"
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl p-4 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-slate-600"
              rows={4}
            />
            <p className="text-xs text-slate-500">Add specific instructions to guide the AI extraction process.</p>
          </div>

          <button
            onClick={handleRunOCR}
            disabled={isProcessing || selectedFiles.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Run OCR Analysis
          </button>
        </div>
      )}

      {isProcessing && (
        <div className="bg-[#0f172a]/80 backdrop-blur border border-blue-500/20 rounded-2xl p-8 text-center space-y-6">
          <ProgressBar progress={0} isIndeterminate={true} label="Analyzing documents with AI..." showPercentage={false} />
          <p className="text-blue-400 animate-pulse font-medium">This may take a moment...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default UploadPage;
