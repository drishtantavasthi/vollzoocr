export const LocalStorageService = {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error(`Error saving to localStorage key "${key}":`, e);
      return false;
    }
  },

  load(key, defaultValue = []) {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;
      return JSON.parse(data);
    } catch (e) {
      console.error(`Error loading from localStorage key "${key}":`, e);
      return defaultValue;
    }
  },

  remove(key, id) {
    try {
      const currentData = this.load(key, []);
      if (Array.isArray(currentData)) {
        const newData = currentData.filter(item => item.id !== id);
        this.save(key, newData);
        return true;
      }
      return false;
    } catch (e) {
      console.error(`Error removing item from localStorage key "${key}":`, e);
      return false;
    }
  },

  clear(key) {
    localStorage.removeItem(key);
  }
};
