import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../ui'
import { cn } from '../../utils/cn'

export interface StatCardProps {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  accent?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  trend?: string
  className?: string
  style?: CSSProperties
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'primary',
  trend,
  className,
  style,
}: StatCardProps) {
  return (
    <article
      className={cn('stat-card', `stat-card--${accent}`, className)}
      style={style}
    >
      <div className="stat-card__header">
        <div className={cn('stat-card__icon', `stat-card__icon--${accent}`)}>
          <Icon size={20} aria-hidden="true" />
        </div>
        {trend ? (
          <Badge variant={accent === 'danger' ? 'danger' : 'success'}>
            {trend}
          </Badge>
        ) : null}
      </div>
      <div className="stat-card__body">
        <p className="stat-card__label">{title}</p>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__subtitle">{subtitle}</p>
      </div>
    </article>
  )
}
