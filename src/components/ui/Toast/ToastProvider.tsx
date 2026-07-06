import { X } from 'lucide-react'
import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from '../Button/Button'
import {
  ToastContext,
  type ToastContextValue,
  type ToastItem,
} from './ToastContext'

interface ToastProviderProps {
  children: ReactNode
}

function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[]
  onDismiss: (id: string) => void
}) {
  if (toasts.length === 0) {
    return null
  }

  return createPortal(
    <div className="toast-container" aria-live="polite" aria-relevant="additions">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.variant ?? 'info'}`}
          role="status"
        >
          <div className="toast__content">
            <p className="toast__title">{toast.title}</p>
            {toast.description ? (
              <p className="toast__description">{toast.description}</p>
            ) : null}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDismiss(toast.id)}
            aria-label="Bildirimi kapat"
          >
            <X size={16} aria-hidden="true" />
          </Button>
        </div>
      ))}
    </div>,
    document.body,
  )
}

export default function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = crypto.randomUUID()
      const duration = toast.duration ?? 4000

      setToasts((current) => [...current, { ...toast, id }])

      window.setTimeout(() => {
        dismissToast(id)
      }, duration)
    },
    [dismissToast],
  )

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      showToast,
      dismissToast,
    }),
    [toasts, showToast, dismissToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}
