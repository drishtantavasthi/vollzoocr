export class OCRResult {
  constructor({ extractedData, downloadURL = '', timestamp = Date.now() }) {
    this.extractedData = extractedData || {};
    this.downloadURL = downloadURL;
    this.timestamp = timestamp;
  }

  get isGrouped() {
    return Object.values(this.extractedData).some(
      (value) => typeof value === 'object' && value !== null
    );
  }

  getFieldCount() {
    if (this.isGrouped) {
      return Object.values(this.extractedData).reduce(
        (count, group) => count + Object.keys(group).length,
        0
      );
    }
    return Object.keys(this.extractedData).length;
  }

  getFileNames() {
    if (this.isGrouped) {
      return Object.keys(this.extractedData);
    }
    return [];
  }

  flatten() {
    if (this.isGrouped) {
      const flattened = {};
      for (const [groupName, groupData] of Object.entries(this.extractedData)) {
        for (const [key, value] of Object.entries(groupData)) {
          flattened[`${groupName} - ${key}`] = value;
        }
      }
      return flattened;
    }
    return { ...this.extractedData };
  }

  toJSON() {
    return {
      extractedData: this.extractedData,
      downloadURL: this.downloadURL,
      timestamp: this.timestamp
    };
  }

  static fromJSON(json) {
    return new OCRResult(json);
  }
}
