import { useState } from 'react';
import { useAppState } from './useAppState';
import { OCRController } from '../controllers/OCRController';
import { ACTION_TYPES } from '../models/AppStateModel';
import { AppController } from '../controllers/AppController';

export const useOCR = () => {
  const { state, dispatch } = useAppState();
  const [error, setError] = useState(null);

  const processFiles = async (files, instructions) => {
    dispatch({ type: ACTION_TYPES.START_PROCESSING });
    setError(null);
    
    try {
      const result = await OCRController.processBatch(files, instructions);
      dispatch({ type: ACTION_TYPES.SET_OCR_RESULT, payload: result });
      dispatch({ type: ACTION_TYPES.STOP_PROCESSING });
    } catch (err) {
      dispatch({ type: ACTION_TYPES.STOP_PROCESSING });
      setError(err.message);
      AppController.handleNotification(dispatch, err.message, 'error');
    }
  };

  const reset = () => {
    dispatch({ type: ACTION_TYPES.RESET_UPLOAD });
    setError(null);
  };

  return {
    processFiles,
    isProcessing: state.isProcessing,
    result: state.currentOCRResult,
    error,
    reset
  };
};
