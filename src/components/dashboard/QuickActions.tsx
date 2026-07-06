import type { QuickAction } from '../../constants/dashboard'
import { cn } from '../../utils/cn'

interface QuickActionsProps {
  actions: QuickAction[]
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
          const Icon = action.icon

          return (
            <button
              key={action.id}
              type="button"
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
            </button>
          )
        })}
      </div>
    </section>
  )
}
