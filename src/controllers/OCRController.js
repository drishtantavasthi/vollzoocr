import { OCRResult } from '../models/OCRResultModel';
import { GeminiService } from '../services/GeminiService';
import { FirebaseStorageService } from '../services/FirebaseStorageService';

export const OCRController = {
  async processBatch(files, instructions = '') {
    try {
      // Run Gemini extraction IMMEDIATELY — no waiting for upload
      const extractedData = await GeminiService.extractDataFromDocuments(files, instructions);

      // Fire-and-forget: upload to Firebase in the background
      // Don't block the user — if it fails (e.g. expired rules), extraction still works
      let downloadURL = '';
      Promise.all(
        files.map(file => FirebaseStorageService.uploadFile(file, 'ocr_uploads'))
      )
        .then(urls => { downloadURL = urls.join(', '); })
        .catch(err => console.warn('Firebase upload skipped:', err.message));

      return new OCRResult({
        extractedData,
        downloadURL,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      throw new Error(`OCR Processing Failed: ${error.message}`);
    }
  }
};
