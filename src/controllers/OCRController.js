import { uploadFile } from "../firebase/storage";
import { extractDataFromDocuments } from "../utils/ocr";

export class OCRController {
  /**
   * Validates if the selected files are valid PDFs.
   * @param {File[]} files 
   * @returns {File[]} valid files
   */
  static validatePDFFiles(files) {
    return files.filter(f => f.type === "application/pdf");
  }

  /**
   * Processes a batch of documents: uploads them securely to Firebase Storage,
   * then routes them through Gemini OCR.
   * 
   * @param {File[]} files Array of selected files
   * @param {string} instructions Custom instructions for Gemini
   * @param {Object} callbacks UI feedback handlers: { onUploadStart, onOcrStart, onSuccess, onError }
   */
  static async processBatch(files, instructions, callbacks = {}) {
    try {
      if (!files || files.length === 0) {
        throw new Error("No files provided for processing.");
      }

      if (callbacks.onUploadStart) callbacks.onUploadStart();

      // 1. Upload to Firebase Storage
      const uploadPromises = files.map((file) => 
        uploadFile(file, `uploads/pdfs`, () => {
          // Progress can be piped here if needed by the app
        })
      );
      
      const downloadURLs = await Promise.all(uploadPromises);
      const downloadURLString = downloadURLs.join(", ");

      if (callbacks.onOcrStart) callbacks.onOcrStart();

      // 2. Extract Data collectively via Gemini API
      const extractedData = await extractDataFromDocuments(files, instructions);

      if (callbacks.onSuccess) {
        callbacks.onSuccess(extractedData, downloadURLString);
      }

      return { extractedData, downloadURLString };

    } catch (error) {
      if (callbacks.onError) callbacks.onError(error);
      throw error;
    }
  }
}
