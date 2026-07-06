import { X } from 'lucide-react'
import { useEffect, useId, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../../utils/cn'
import Button from '../Button/Button'

export interface DrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
}

export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right',
  className,
}: DrawerProps) {
  const titleId = useId()

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <>
      <div className="drawer-overlay" role="presentation" onClick={onClose} />
      <aside
        className={cn('drawer', `drawer--${side}`, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="drawer__header">
          <h2 id={titleId} className="text-title">
            {title}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Kapat"
          >
            <X size={18} aria-hidden="true" />
          </Button>
        </div>
        <div className="drawer__body">{children}</div>
      </aside>
    </>,
    document.body,
  )
}
