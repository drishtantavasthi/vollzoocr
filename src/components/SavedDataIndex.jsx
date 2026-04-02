import { DocumentTextIcon } from "@heroicons/react/24/outline";

export default function SavedDataIndex({ savedDocuments }) {
  if (!savedDocuments || savedDocuments.length === 0) {
    return null;
  }

  return (
    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6 mt-8 rounded-lg shadow">
      <h3 className="text-lg leading-6 font-medium text-gray-900">Saved Documents Library</h3>
      <p className="mt-1 text-sm text-gray-500 mb-6">
        History of all documents you have parsed and saved.
      </p>

      <ul role="list" className="divide-y divide-gray-200 border-t border-gray-200">
        {savedDocuments.map((doc, index) => (
          <li key={index} className="py-4 hover:bg-gray-50 flex items-start space-x-4 cursor-pointer">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-indigo-500" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-indigo-600 truncate">
                {doc.downloadURL ? (
                  <a href={doc.downloadURL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Document #{index + 1} Original PDF
                  </a>
                ) : (
                   `Document #${index + 1}`
                )}
              </p>
              
              <div className="mt-2 text-sm text-gray-500 bg-gray-50 p-3 rounded border border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.entries(doc.data).map(([key, value]) => {
                  // Only show the first few fields or a preview to avoid huge lists
                  return (
                    <div key={key} className="truncate">
                      <span className="font-semibold text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                      <span>{value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="flex-shrink-0 text-sm text-gray-400">
              {new Date(doc.timestamp).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
