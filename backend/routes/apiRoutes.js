import express from 'express';
import multer from 'multer';
import { extractData } from '../controllers/ocrController.js';

const router = express.Router();

// Configure multer for memory storage, meaning the file buffer will be immediately available
const upload = multer({ storage: multer.memoryStorage() });

// Endpoint for OCR Extraction
// Expects a form-data request with 'file' and optional 'instructions'
router.post('/extract', upload.single('file'), extractData);

export default router;
