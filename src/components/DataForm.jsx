import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export default function DataForm({ ExtractedData, onSave }) {
  const [formData, setFormData] = useState({});
  const [isGrouped, setIsGrouped] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (ExtractedData) {
      setFormData(ExtractedData);
      
      const keys = Object.keys(ExtractedData);
      const isNested = keys.length > 0 && typeof ExtractedData[keys[0]] === 'object' && ExtractedData[keys[0]] !== null;
      
      setIsGrouped(isNested);
      
      if (isNested) {
        // Expand all sections by default
        const initialExpanded = {};
        keys.forEach(k => initialExpanded[k] = true);
        setExpandedSections(initialExpanded);
      }
    }
  }, [ExtractedData]);

  const handleChange = (e, groupKey = null) => {
    const { name, value } = e.target;
    if (groupKey) {
      setFormData((prev) => ({
        ...prev,
        [groupKey]: {
          ...prev[groupKey],
          [name]: value,
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const toggleSection = (groupKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [groupKey]: !prev[groupKey]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
  };

  const getExpectedHeight = (text) => {
    if (!text) return 1;
    const lines = text.toString().split("\n").length;
    return Math.min(Math.max(lines, 1), 6); 
  };

  const renderInputs = (dataObj, groupKey = null) => {
    return Object.entries(dataObj).map(([key, value]) => {
      const isMultiline = value && (value.toString().length > 60 || value.toString().includes("\n"));
      return (
        <div key={key} className={isMultiline ? "sm:col-span-2" : ""}>
          <label htmlFor={`${groupKey || 'flat'}-${key}`} className="block text-sm font-semibold text-gray-700 capitalize mb-1"> 
            {key.replace(/([A-Z])/g, ' $1').trim()} 
          </label>
          <div className="mt-1">
            {isMultiline ? (
              <textarea 
                id={`${groupKey || 'flat'}-${key}`} 
                name={key} 
                rows={getExpectedHeight(value)} 
                value={value || ''} 
                onChange={(e) => handleChange(e, groupKey)} 
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2 transition-colors bg-white hover:bg-gray-50" 
              />
            ) : (
              <input 
                type="text" 
                name={key} 
                id={`${groupKey || 'flat'}-${key}`} 
                value={value || ''} 
                onChange={(e) => handleChange(e, groupKey)} 
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border transition-colors bg-white hover:bg-gray-50" 
              />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="mt-12 bg-[#f8f9fa] sm:rounded-b-md sm:rounded-tr-md p-6 border border-gray-300 shadow-sm relative">
      {/* UMMS style tab header */}
      <div className="absolute -top-[35px] left-[-1px] bg-[#4a7eb3] text-white px-5 py-1.5 rounded-t-md text-sm font-semibold shadow-sm border border-[#4a7eb3] flex items-center space-x-2">
        <svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
        <span>Extracted Details</span>
      </div>

      <div className="border-b border-gray-300 pb-3 mb-5 flex justify-between items-center mt-1">
        <p className="text-sm text-gray-700 font-medium">
          Review and finalize the data extracted from your documents. 
          {isGrouped && " Results are separated by file."}
        </p>
        <div className="bg-[#4a7eb3]/10 text-[#4a7eb3] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {isGrouped ? Object.keys(formData).length + " Files" : "Combined"}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {isGrouped ? (
          // Render Accordion/Grouped Sections side-by-side
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 items-start">
            {Object.entries(formData).map(([groupKey, groupData]) => (
              <div key={groupKey} className="bg-white rounded-md overflow-hidden border border-gray-300 shadow-sm">
                <div 
                  className="px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
                  onClick={() => toggleSection(groupKey)}
                >
                  <h4 className="text-sm font-bold text-gray-800 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-[#4a7eb3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    <span>{groupKey}</span>
                  </h4>
                  <button type="button" className="text-gray-500 focus:outline-none">
                    {expandedSections[groupKey] ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                
                {expandedSections[groupKey] && (
                  <div className="p-5 bg-white grid grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-2">
                    {renderInputs(groupData, groupKey)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          // Render Flat
          <div className="grid grid-cols-1 gap-y-5 sm:grid-cols-2 sm:gap-x-6 bg-white p-5 rounded-md border border-gray-300 shadow-sm">
            {renderInputs(formData, null)}
          </div>
        )}

        <div className="flex justify-end pt-4 space-x-3">
          <button 
            type="button" 
            className="inline-flex justify-center items-center py-2 px-6 border border-gray-300 shadow-sm text-sm font-semibold rounded text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="inline-flex justify-center items-center py-2 px-6 border border-transparent shadow-sm text-sm font-semibold rounded text-white bg-[#4a7eb3] hover:bg-[#3b6590] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a7eb3] transition-colors"
          >
            Save Data
          </button>
        </div>
      </form>
    </div>
  );
}
