import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Layout from './views/layout/Layout';
import DashboardPage from './views/pages/DashboardPage';
import UploadPage from './views/pages/UploadPage';
import ReviewPage from './views/pages/ReviewPage';
import SavedPage from './views/pages/SavedPage';
import { ToastContainer } from './views/components/Toast';

function App() {
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (path) => {
    setCurrentPath(path);
  };

  const pageTitleMap = {
    '/': 'Dashboard',
    '/upload': 'Upload Documents',
    '/review': 'Review Data',
    '/saved': 'Saved Documents'
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <DashboardPage onNavigate={handleNavigate} />;
      case '/upload':
        return <UploadPage onNavigate={handleNavigate} />;
      case '/review':
        return <ReviewPage onNavigate={handleNavigate} />;
      case '/saved':
        return <SavedPage onNavigate={handleNavigate} />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <ToastContainer />
      <Layout 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        pageTitle={pageTitleMap[currentPath] || 'Vollzo OCR'}
      >
        {renderPage()}
      </Layout>
    </AppProvider>
  );
}

export default App;
