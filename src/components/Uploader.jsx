import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DocumentArrowUpIcon, TrashIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { OCRController } from "../controllers/OCRController";

export default function Uploader({ onExtractionSuccess }) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [instructions, setInstructions] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const validFiles = acceptedFiles.filter(f => f.type === "application/pdf");
    if (validFiles.length === 0) {
      toast.error("Please upload valid PDF files.");
      return;
    }
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
  }, []);

  const handleRemoveFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setProgress(0);
    
    try {
      await OCRController.processBatch(selectedFiles, instructions, {
        onUploadStart: () => {
          toast.loading(`Uploading ${selectedFiles.length} document(s)...`, { id: 'upload-toast' });
        },
        onOcrStart: () => {
          toast.success("Upload complete! Analyzing documents...", { id: 'upload-toast' });
          toast.loading("Extracting information collectively...", { id: 'ocr-toast' });
        },
        onSuccess: (extractedData, downloadURLString) => {
          toast.success("Data extracted successfully!", { id: 'ocr-toast' });
          if (onExtractionSuccess) {
             onExtractionSuccess(extractedData, downloadURLString);
             setSelectedFiles([]);
             setInstructions("");
          }
        },
        onError: (error) => {
          toast.error(error.message || "Failed to process documents.", { id: 'upload-toast' });
          toast.dismiss('ocr-toast');
          console.error(error);
        }
      });
    } finally {
      setIsUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    disabled: isUploading,
  });

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-gray-400 bg-white"
        } ${isUploading ? "opacity-75 cursor-wait pointer-events-none" : ""}`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          {isUploading ? (
             <div className="w-full max-w-xs space-y-2">
               <div className="flex justify-between text-sm text-gray-600 mb-1">
                 <span>Processing...</span>
                 <span></span>
               </div>
               <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300 w-full animate-pulse"></div>
               </div>
             </div>
          ) : (
            <>
              <DocumentArrowUpIcon className="h-12 w-12 text-gray-400" />
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-semibold text-indigo-600">Click to upload PDFs</p>
                <p>or drag and drop</p>
              </div>
            </>
          )}
        </div>
      </div>

      {selectedFiles.length > 0 && !isUploading && (
        <div className="mt-8 bg-[#f8f9fa] sm:rounded-b-md sm:rounded-tr-md p-6 border border-gray-300 shadow-sm relative">
          {/* UMMS style tab header */}
          <div className="absolute -top-[35px] left-[-1px] bg-[#4a7eb3] text-white px-5 py-1.5 rounded-t-md text-sm font-semibold shadow-sm border border-[#4a7eb3] flex items-center space-x-2">
            <svg className="w-4 h-4 text-white/90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
             <span>Batch Processing Settings</span>
          </div>
          
          <div className="mb-6 mt-2">
            <h5 className="text-sm font-semibold text-gray-700 mb-4">Selected Documents:</h5>
            <ul className="flex flex-wrap gap-3">
              {selectedFiles.map((file, idx) => (
                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-700 bg-gray-100 px-3 py-1.5 rounded border border-gray-300 shadow-sm transition-transform hover:scale-105">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  <span className="truncate max-w-[200px] font-medium">{file.name}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(idx);
                    }}
                    className="text-gray-500 hover:text-red-700 ml-2 focus:outline-none rounded-full p-0.5"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-2">
            <label htmlFor="instructions" className="block text-sm font-semibold text-gray-700 mb-2">
              Instructions to Extract:
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="flex-1 w-full">
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={2}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-3"
                  placeholder="e.g. Find the invoice total, customer name, and line items from these PDFs and combine them."
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  disabled={isUploading}
                />
                <p className="mt-2 text-xs text-gray-500">
                  Leave blank to extract all available key-value pairs collectively across all attached documents.
                </p>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSubmit();
                }}
                className="w-full sm:w-auto inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-bold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors shadow-sm"
                disabled={isUploading || selectedFiles.length === 0}
              >
                Run OCR Analysis 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
