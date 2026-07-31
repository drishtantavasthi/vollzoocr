import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../firebase/config";

export const FirebaseStorageService = {
  uploadFile(file, folder = "uploads/pdfs", onProgress) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error("No file provided."));
        return;
      }

      const timestamp = Date.now();
      const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const storageRef = ref(storage, `${folder}/${timestamp}_${safeName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  },

  async getFileURL(path) {
    const storageRef = ref(storage, path);
    return await getDownloadURL(storageRef);
  },

  async deleteFile(path) {
    const storageRef = ref(storage, path);
    return await deleteObject(storageRef);
  }
};
