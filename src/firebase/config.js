// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdQaX6JO66hPRgrLWtFTX_qSLY9sTa1kI",
  authDomain: "vollzo-ocr.firebaseapp.com",
  projectId: "vollzo-ocr",
  storageBucket: "vollzo-ocr.firebasestorage.app",
  messagingSenderId: "943958955844",
  appId: "1:943958955844:web:1bae6be0ee84bcf3e2a911",
  measurementId: "G-Y1DPM0PC4F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
export const storage = getStorage(app);
export default app;
