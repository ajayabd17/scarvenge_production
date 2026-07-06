/**
 * SCARVENGE — Toast Context
 * Auto-dismissing notification system with top-right/top-center positioning.
 */
import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const show = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  const success = useCallback((msg, duration) => show(msg, 'success', duration), [show]);
  const error   = useCallback((msg, duration) => show(msg, 'error', duration), [show]);
  const info    = useCallback((msg, duration) => show(msg, 'info', duration), [show]);

  return (
    <ToastContext.Provider value={{ toasts, show, success, error, info, dismiss }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
