import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const ToastContainer = () => {
  return (
    <Toaster 
      position="top-right" 
      toastOptions={{
        className: 'glass-card !bg-slate-800/90 !text-slate-200 !border-white/10',
        duration: 4000,
        style: { 
          background: 'rgba(30, 41, 59, 0.95)', 
          color: '#f8fafc', 
          border: '1px solid rgba(255,255,255,0.08)', 
          backdropFilter: 'blur(16px)' 
        },
        success: { 
          iconTheme: { primary: '#8b5cf6', secondary: '#f8fafc' } 
        },
        error: { 
          iconTheme: { primary: '#ef4444', secondary: '#f8fafc' } 
        },
      }} 
    />
  );
};

export const showToast = {
  success: (msg) => toast.success(msg),
  error: (msg) => toast.error(msg),
  loading: (msg, id) => toast.loading(msg, { id }),
  dismiss: (id) => toast.dismiss(id)
};
