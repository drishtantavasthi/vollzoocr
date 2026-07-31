export class Document {
  constructor({ id, data, downloadURL, timestamp, fileName }) {
    this.id = id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString());
    this.data = data || {};
    this.downloadURL = downloadURL || '';
    this.timestamp = timestamp || Date.now();
    this.fileName = fileName || 'Unknown Document';
  }

  validate() {
    const errors = [];
    if (!this.data || typeof this.data !== 'object') {
      errors.push('Data must be an object');
    } else if (Object.keys(this.data).length === 0) {
      errors.push('Data cannot be empty');
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }

  toJSON() {
    return {
      id: this.id,
      data: this.data,
      downloadURL: this.downloadURL,
      timestamp: this.timestamp,
      fileName: this.fileName
    };
  }

  static fromJSON(json) {
    return new Document(json);
  }

  static fromExtractedData(extractedData, downloadURL, fileName = 'Processed Document') {
    return new Document({
      data: extractedData,
      downloadURL,
      fileName
    });
  }

  getPreview(maxFields = 4) {
    return Object.entries(this.data)
      .slice(0, maxFields)
      .map(([key, value]) => ({ key, value }));
  }

  getFieldCount() {
    return Object.keys(this.data).length;
  }
}
