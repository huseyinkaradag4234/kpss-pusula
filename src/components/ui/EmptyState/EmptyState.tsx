import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('empty-state', className)}>
      {icon ? <div className="empty-state__icon">{icon}</div> : null}
      <div>
        <h3 className="text-title">{title}</h3>
        {description ? (
          <p className="text-caption" style={{ marginTop: 'var(--space-2)' }}>
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
