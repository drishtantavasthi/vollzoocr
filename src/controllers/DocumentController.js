import { Document } from '../models/DocumentModel';
import { LocalStorageService } from '../services/LocalStorageService';

const STORAGE_KEY = 'vollzo_documents';

export const DocumentController = {
  saveDocument(extractedData, downloadURL) {
    const doc = Document.fromExtractedData(extractedData, downloadURL);
    const { valid, errors } = doc.validate();
    if (!valid) {
      throw new Error(`Invalid document data: ${errors.join(', ')}`);
    }
    
    const existingDocs = this.getAllDocuments();
    const updatedDocs = [...existingDocs, doc];
    LocalStorageService.save(STORAGE_KEY, updatedDocs.map(d => d.toJSON()));
    return doc;
  },

  getAllDocuments() {
    const rawData = LocalStorageService.load(STORAGE_KEY, []);
    return rawData.map(json => Document.fromJSON(json));
  },

  deleteDocument(id) {
    const existingDocs = this.getAllDocuments();
    const updatedDocs = existingDocs.filter(d => d.id !== id);
    LocalStorageService.save(STORAGE_KEY, updatedDocs.map(d => d.toJSON()));
    return updatedDocs;
  },

  searchDocuments(query) {
    const docs = this.getAllDocuments();
    if (!query) return docs;
    const lowerQuery = query.toLowerCase();
    
    return docs.filter(doc => {
      return Object.values(doc).some(value => 
        String(value).toLowerCase().includes(lowerQuery)
      );
    });
  },

  getStats() {
    const docs = this.getAllDocuments();
    const totalDocuments = docs.length;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = docs.filter(doc => 
      new Date(doc.createdAt) >= sevenDaysAgo
    ).length;

    return { totalDocuments, recentCount };
  }
};
