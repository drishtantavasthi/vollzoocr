export const ACTION_TYPES = {
  SET_FILES: 'SET_FILES',
  REMOVE_FILE: 'REMOVE_FILE',
  START_PROCESSING: 'START_PROCESSING',
  STOP_PROCESSING: 'STOP_PROCESSING',
  SET_OCR_RESULT: 'SET_OCR_RESULT',
  SAVE_DOCUMENT: 'SAVE_DOCUMENT',
  DELETE_DOCUMENT: 'DELETE_DOCUMENT',
  LOAD_DOCUMENTS: 'LOAD_DOCUMENTS',
  ADD_NOTIFICATION: 'ADD_NOTIFICATION',
  DISMISS_NOTIFICATION: 'DISMISS_NOTIFICATION',
  RESET_UPLOAD: 'RESET_UPLOAD'
};

export const initialState = {
  documents: [],
  currentOCRResult: null,
  selectedFiles: [],
  instructions: '',
  isProcessing: false,
  notifications: [],
  currentPage: 'dashboard'
};

export function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_FILES:
      return { ...state, selectedFiles: action.payload };
    case ACTION_TYPES.REMOVE_FILE:
      return { ...state, selectedFiles: state.selectedFiles.filter(f => f.name !== action.payload) };
    case ACTION_TYPES.START_PROCESSING:
      return { ...state, isProcessing: true, currentOCRResult: null };
    case ACTION_TYPES.STOP_PROCESSING:
      return { ...state, isProcessing: false };
    case ACTION_TYPES.SET_OCR_RESULT:
      return { ...state, currentOCRResult: action.payload, isProcessing: false };
    case ACTION_TYPES.SAVE_DOCUMENT:
      return { ...state, documents: [action.payload, ...state.documents] };
    case ACTION_TYPES.DELETE_DOCUMENT:
      return { ...state, documents: state.documents.filter(doc => doc.id !== action.payload) };
    case ACTION_TYPES.LOAD_DOCUMENTS:
      return { ...state, documents: action.payload };
    case ACTION_TYPES.ADD_NOTIFICATION:
      return { 
        ...state, 
        notifications: [
          ...state.notifications, 
          { 
            id: Date.now().toString(), 
            timestamp: Date.now(),
            ...action.payload 
          }
        ] 
      };
    case ACTION_TYPES.DISMISS_NOTIFICATION:
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) };
    case ACTION_TYPES.RESET_UPLOAD:
      return { ...state, selectedFiles: [], currentOCRResult: null, instructions: '' };
    default:
      return state;
  }
}
