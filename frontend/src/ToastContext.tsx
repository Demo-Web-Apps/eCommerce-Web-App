import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts, { id, message, type, duration }]);
    setTimeout(() => {
      setToasts(ts => ts.filter(t => t.id !== id));
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            style={{
              minWidth: 240,
              maxWidth: 340,
              background: t.type === 'success' ? '#007600' : t.type === 'error' ? '#b12704' : '#232f3e',
              color: '#fff',
              border: t.type === 'success' ? '2px solid #ffd814' : t.type === 'error' ? '2px solid #b12704' : '2px solid #e3e6e6',
              borderRadius: 10,
              boxShadow: '0 2px 12px rgba(35,47,62,0.13)',
              padding: '16px 22px',
              fontWeight: 600,
              fontSize: 16,
              letterSpacing: 0.1,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              animation: 'toastIn 0.2s',
            }}
          >
            {t.type === 'success' && <span style={{ fontSize: 20, marginRight: 6 }}>✔️</span>}
            {t.type === 'error' && <span style={{ fontSize: 20, marginRight: 6 }}>❌</span>}
            {t.type === 'info' && <span style={{ fontSize: 20, marginRight: 6 }}>ℹ️</span>}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
} 