import { useAppState } from './useAppState';
import { DocumentController } from '../controllers/DocumentController';
import { ACTION_TYPES } from '../models/AppStateModel';
import { AppController } from '../controllers/AppController';

export const useDocuments = () => {
  const { state, dispatch } = useAppState();

  const saveDocument = (extractedData, downloadURL) => {
    try {
      const doc = DocumentController.saveDocument(extractedData, downloadURL);
      dispatch({ type: ACTION_TYPES.SAVE_DOCUMENT, payload: doc });
      AppController.handleNotification(dispatch, 'Document saved successfully', 'success');
      return doc;
    } catch (error) {
      AppController.handleNotification(dispatch, error.message, 'error');
      throw error;
    }
  };

  const deleteDocument = (id) => {
    DocumentController.deleteDocument(id);
    dispatch({ type: ACTION_TYPES.DELETE_DOCUMENT, payload: id });
    AppController.handleNotification(dispatch, 'Document deleted', 'success');
  };

  const searchDocuments = (query) => {
    return DocumentController.searchDocuments(query);
  };

  const loadDocuments = () => {
    const docs = DocumentController.getAllDocuments();
    dispatch({ type: ACTION_TYPES.LOAD_DOCUMENTS, payload: docs });
  };

  const computeStats = () => {
    const docs = state.documents || [];
    const totalDocuments = docs.length;
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentCount = docs.filter(doc => new Date(doc.createdAt) >= sevenDaysAgo).length;

    return { totalDocuments, recentCount };
  };

  return {
    documents: state.documents || [],
    saveDocument,
    deleteDocument,
    searchDocuments,
    loadDocuments,
    stats: computeStats()
  };
};
