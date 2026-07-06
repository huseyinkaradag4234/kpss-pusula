import { BookOpen, ClipboardList, Heart, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { QuickActionItem } from '../../features/kpss/types'
import { cn } from '../../utils/cn'

const quickActionIcons: Record<string, LucideIcon> = {
  'solve-test': ClipboardList,
  topics: BookOpen,
  mistakes: RotateCcw,
  favorites: Heart,
}

export interface QuickActionView extends QuickActionItem {
  icon?: LucideIcon
}

interface QuickActionsProps {
  actions: QuickActionView[]
  className?: string
}

export default function QuickActions({ actions, className }: QuickActionsProps) {
  return (
    <section className={cn('quick-actions', className)} aria-labelledby="quick-actions-title">
      <h2 id="quick-actions-title" className="dashboard-section__title">
        Hızlı İşlemler
      </h2>
      <div className="quick-actions__grid">
        {actions.map((action) => {
          const Icon = action.icon ?? quickActionIcons[action.id] ?? BookOpen

          return (
            <Link
              key={action.id}
              to={action.to}
              className="quick-action-card interactive"
            >
              <span className="quick-action-card__icon" aria-hidden="true">
                <Icon size={22} />
              </span>
              <span className="quick-action-card__content">
                <span className="quick-action-card__label">{action.label}</span>
                <span className="quick-action-card__description">
                  {action.description}
                </span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
