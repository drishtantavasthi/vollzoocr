import React, { useState, useEffect } from 'react';
import { useOCR } from '../../hooks/useOCR';
import { useDocuments } from '../../hooks/useDocuments';
import DataField from '../components/DataField';
import EmptyState from '../components/EmptyState';
import { showToast } from '../components/Toast';

const ReviewPage = ({ onNavigate }) => {
  const { result, reset } = useOCR();
  const { saveDocument } = useDocuments();
  const [formData, setFormData] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (result?.extractedData) {
      setFormData(result.extractedData);
      
      // Auto-expand all sections if grouped
      if (result.isGrouped) {
        const initialExpanded = {};
        Object.keys(result.extractedData).forEach(key => {
          initialExpanded[key] = true;
        });
        setExpandedSections(initialExpanded);
      }
    }
  }, [result]);

  if (!result || !result.extractedData) {
    return (
      <EmptyState
        title="No data to review"
        description="Run OCR on a document to see extracted data here."
        icon={<svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>}
        actionLabel="Go to Upload"
        onAction={() => onNavigate('/upload')}
      />
    );
  }

  const handleChange = (name, value, groupKey) => {
    if (groupKey) {
      setFormData(prev => ({
        ...prev,
        [groupKey]: {
          ...prev[groupKey],
          [name]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      await saveDocument(formData, null);
      showToast.success('Document saved successfully');
      reset();
      onNavigate('/saved');
    } catch (err) {
      showToast.error('Failed to save document');
    }
  };

  const handleCancel = () => {
    reset();
    onNavigate('/upload');
  };

  const toggleSection = (key) => {
    setExpandedSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderFields = (data, groupKey = null) => {
    return Object.entries(data).map(([key, value]) => {
      const isMultiline = typeof value === 'string' && value.length > 50;
      return (
        <DataField
          key={key}
          name={key}
          label={key}
          value={value || ''}
          onChange={handleChange}
          groupKey={groupKey}
          multiline={isMultiline}
        />
      );
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Review Extracted Data</h1>
          <p className="text-slate-400 text-sm mt-1">Review and edit the AI-extracted information before saving.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/20">
            {result.isGrouped ? `${Object.keys(formData).length} Files` : 'Combined Data'}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {result.isGrouped ? (
          Object.entries(formData).map(([filename, data]) => (
            <div key={filename} className="bg-[#0f172a]/80 backdrop-blur border border-white/[0.08] rounded-xl overflow-hidden">
              <button 
                onClick={() => toggleSection(filename)}
                className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <h3 className="font-medium text-white">{filename}</h3>
                <svg 
                  className={`w-5 h-5 text-slate-400 transform transition-transform ${expandedSections[filename] ? 'rotate-180' : ''}`} 
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {expandedSections[filename] && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderFields(data, filename)}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-[#0f172a]/80 backdrop-blur border border-white/[0.08] rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderFields(formData)}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={handleCancel}
          className="px-6 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-colors"
        >
          Save Document
        </button>
      </div>
    </div>
  );
};

export default ReviewPage;
