import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface PageHeaderProps {
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export default function PageHeader({
  title,
  description,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('page-header', className)}>
      <div className="page-header__top">
        <div>
          <h1 className="text-heading">{title}</h1>
          {description ? (
            <p className="text-caption" style={{ marginTop: 'var(--space-2)' }}>
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="page-header__actions">{actions}</div> : null}
      </div>
    </header>
  )
}
