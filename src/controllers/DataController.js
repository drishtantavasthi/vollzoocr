export class DataController {
  /**
   * Formats the extracted data and storage payload into a storable database document.
   * Useful for hooking up to Firestore when the mobile app needs permanent cloud records.
   * 
   * @param {Object} finalData - The JSON payload evaluated from Gemini
   * @param {string} currentDownloadURL - Stringified URL/URLs from Firebase Storage
   * @returns {Object} A formatted document to easily push to global states or Firestore
   */
  static formatDocumentRecord(finalData, currentDownloadURL) {
    return {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      data: finalData,
      downloadURL: currentDownloadURL,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Saves the document array to a storage bucket or Firestore DB.
   * Currently mocks returning the appended global state array.
   */
  static async saveDocumentRecord(currentRecords, newRecord) {
    // Add logic here to save strictly to Firestore if migrating mobile app
    // e.g. await addDoc(collection(db, "documents"), newRecord);
    return [newRecord, ...currentRecords];
  }
}
