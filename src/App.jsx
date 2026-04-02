import { useState } from 'react'
import Uploader from './components/Uploader'
import DataForm from './components/DataForm'
import SavedDataIndex from './components/SavedDataIndex'
import { Toaster, toast } from 'react-hot-toast'
import { DataController } from './controllers/DataController'
import './App.css'

function App() {
  const [extractedData, setExtractedData] = useState(null);
  const [currentDownloadURL, setCurrentDownloadURL] = useState("");
  const [savedDocuments, setSavedDocuments] = useState([]);

  const handleExtractionSuccess = (data, downloadURL) => {
    console.log("Uploaded PDF:", downloadURL);
    console.log("Extracted Data:", data);
    setExtractedData(data);
    setCurrentDownloadURL(downloadURL);
  };

  const handleSaveData = async (finalData) => {
    const newDoc = DataController.formatDocumentRecord(finalData, currentDownloadURL);
    
    const updatedRecords = await DataController.saveDocumentRecord(savedDocuments, newDoc);
    setSavedDocuments(updatedRecords);
    // Clear current form after saving
    setExtractedData(null);
    setCurrentDownloadURL("");
    toast.success("Document saved to your library.");
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 w-full block">
      <Toaster position="top-right" />
      <div className="w-full max-w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Vollzo OCR
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Upload your scanned PDFs to automatically extract data and fill out the form.
          </p>
        </div>

        <div className="bg-white shadow-xl sm:rounded-lg p-6 space-y-8">
          <Uploader onExtractionSuccess={handleExtractionSuccess} />
          
          {extractedData && (
             <DataForm ExtractedData={extractedData} onSave={handleSaveData} />
          )}
        </div>
        
        {/* Render Saved Documents Library */}
        <SavedDataIndex savedDocuments={savedDocuments} />
      </div>
    </div>
  )
}

export default App
