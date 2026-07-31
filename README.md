# Vollzo OCR — AI Document Intelligence & OCR Platform

![Vollzo OCR](https://img.shields.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.shields.io/badge/Vite-8-646CFF?logo=vite)
![TailwindCSS](https://img.shields.shields.io/badge/TailwindCSS-v3-38B2AC?logo=tailwindcss)
![Google Gemini](https://img.shields.shields.io/badge/Google_Gemini-2.0_Flash-8E44AD?logo=google)
![Architecture](https://img.shields.shields.io/badge/Architecture-MVC-emerald)

**Vollzo OCR** is an intelligent, high-performance document extraction platform built with React 19, Vite, and Google Gemini AI. It transforms scanned PDFs, receipts, invoices, and documents into structured, editable JSON data in seconds.

---

## ✨ Features

- 📄 **Multi-Document Batch Processing**: Upload single or multiple PDF documents simultaneously.
- 🧠 **AI-Powered OCR**: Leverages Google Gemini 2.0 Flash Vision AI to accurately extract key-value data.
- 🎯 **Custom Extraction Instructions**: Instruct the AI engine to extract specific fields (e.g., *"Find total amount, vendor name, and line items"*).
- 🏗️ **Clean MVC Architecture**: Modular separation of concerns into Models, Views, Controllers, Services, and Hooks.
- 🎨 **Modern Dark Glassmorphism UI**: Beautiful, responsive dark-themed interface built with Tailwind CSS, custom animations, and glassmorphic panels.
- 💾 **Local & Cloud Persistence**: Saves structured documents to browser local storage with seamless Firebase Storage integration for document previews.
- ⚡ **Side-by-Side Review & Editing**: Edit extracted fields directly in interactive forms before saving.

---

## 🏛️ Model-View-Controller (MVC) Architecture

The application is structured strictly according to **MVC principles** for scalability and maintainability:

```
src/
├── models/                     # Data Structures & Validation
│   ├── AppStateModel.js        # Global App state reducer & actions
│   ├── DocumentModel.js        # Saved document entity & validation rules
│   └── OCRResultModel.js       # Extraction result transformer & helpers
│
├── views/                      # UI Components (Pure Rendering)
│   ├── components/             # Reusable UI (DropZone, DocumentCard, DataField, Toast, etc.)
│   ├── layout/                 # Sidebar, Navbar, and Layout wrapper
│   └── pages/                  # Page Views (Dashboard, Upload, Review, Saved)
│
├── controllers/                # Business Logic & Orchestration
│   ├── AppController.js        # Global application flow & notifications
│   ├── DocumentController.js   # Document CRUD operations
│   └── OCRController.js        # Extraction & upload orchestration
│
├── services/                   # External API Integrations
│   ├── FirebaseStorageService.js  # Firebase Storage upload/download manager
│   ├── GeminiService.js        # Google Gemini AI vision integration
│   └── LocalStorageService.js  # Persistent browser storage provider
│
├── hooks/                      # React ↔ MVC Bridge
│   ├── useAppState.js          # Access global context state
│   ├── useDocuments.js         # Document management hook
│   └── useOCR.js               # OCR extraction state & workflow hook
│
└── context/                    # Centralized React State Store
    └── AppContext.jsx          # Context Provider wrapping app state
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite 8
- **Styling**: Tailwind CSS v3, PostCSS, Custom Glassmorphism System
- **AI Engine**: `@google/generative-ai` (Gemini 2.0 Flash)
- **File Upload**: `react-dropzone`
- **Cloud Storage**: Firebase Storage
- **Notifications**: `react-hot-toast`
- **Icons**: Inline SVG / Heroicons

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn
- Google Gemini API Key ([Get one here](https://aistudio.google.com/))

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/drishtantavasthi/vollzoocr.git
cd vollzoocr
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (you can copy `.env.example`):

```bash
cp .env.example .env
```

Add your Gemini API Key in `.env`:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

---

## 📦 Build for Production

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License.
