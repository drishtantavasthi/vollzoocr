import { ACTION_TYPES } from '../models/AppStateModel';
import { DocumentController } from './DocumentController';

export const AppController = {
  initializeApp(dispatch) {
    const documents = DocumentController.getAllDocuments();
    dispatch({ type: ACTION_TYPES.LOAD_DOCUMENTS, payload: documents });
  },

  handleNotification(dispatch, message, type = 'success') {
    dispatch({
      type: ACTION_TYPES.ADD_NOTIFICATION,
      payload: {
        id: Date.now().toString(),
        message,
        type,
        timestamp: new Date().toISOString()
      }
    });
  },

  dismissNotification(dispatch, id) {
    dispatch({ type: ACTION_TYPES.DISMISS_NOTIFICATION, payload: { id } });
  }
};
