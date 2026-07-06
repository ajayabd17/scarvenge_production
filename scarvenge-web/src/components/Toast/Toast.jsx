import { X, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import './Toast.css';

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map(t => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div key={t.id} className={`toast toast--${t.type}`} role="status">
            <Icon size={18} className="toast__icon" aria-hidden="true" />
            <p className="toast__msg">{t.message}</p>
            <button className="toast__close" onClick={() => dismiss(t.id)} aria-label="Dismiss notification">
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
