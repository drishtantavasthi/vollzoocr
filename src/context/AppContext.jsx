import React, { createContext, useReducer, useEffect } from 'react';
import { initialState, appReducer } from '../models/AppStateModel';
import { AppController } from '../controllers/AppController';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    AppController.initializeApp(dispatch);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
