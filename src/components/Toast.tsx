import { useEffect } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';
import type { ToastData } from '../hooks/useToast';

interface ToastProps {
  toast: ToastData;
  onClose: (id: number) => void;
}

export default function Toast({ toast, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className="animate-slide-down flex items-start gap-3 rounded-xl border border-white/10 bg-ink-800/95 px-5 py-4 shadow-2xl backdrop-blur-xl">
      <div className="mt-0.5 shrink-0">
        {toast.type === 'success' ? (
          <CheckCircle2 className="h-5 w-5 text-green-400" />
        ) : (
          <XCircle className="h-5 w-5 text-red-400" />
        )}
      </div>
      <p className="flex-1 text-sm text-slate-200">{toast.message}</p>
      <button
        onClick={() => onClose(toast.id)}
        className="shrink-0 text-slate-500 transition-colors hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
