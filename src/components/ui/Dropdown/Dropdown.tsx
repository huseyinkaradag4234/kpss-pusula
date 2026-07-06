import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface DropdownItem {
  id: string
  label: string
  icon?: ReactNode
  onSelect?: () => void
  danger?: boolean
  disabled?: boolean
}

export interface DropdownProps {
  trigger: ReactNode
  items: DropdownItem[]
  align?: 'left' | 'right'
  className?: string
}

export default function Dropdown({
  trigger,
  items,
  align = 'right',
  className,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  return (
    <div className={cn('dropdown', className)} ref={containerRef}>
      <div
        onClick={() => setOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            setOpen((current) => !current)
          }
        }}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        {trigger}
      </div>

      {open ? (
        <div
          id={menuId}
          className="dropdown__menu"
          role="menu"
          style={align === 'left' ? { left: 0, right: 'auto' } : undefined}
        >
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={cn(
                'dropdown__item interactive',
                item.danger && 'dropdown__item--danger',
              )}
              role="menuitem"
              disabled={item.disabled}
              onClick={() => {
                item.onSelect?.()
                setOpen(false)
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
