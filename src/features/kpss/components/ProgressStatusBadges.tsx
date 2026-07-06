import { Badge } from '../../../components/ui'
import type { StudyStatus } from '../types'

interface ProgressStatusBadgesProps {
  completed: number
  started: number
  notStarted: number
  className?: string
}

export default function ProgressStatusBadges({
  completed,
  started,
  notStarted,
  className,
}: ProgressStatusBadgesProps) {
  const items: { status: StudyStatus; count: number; label: string }[] = [
    { status: 'completed', count: completed, label: 'Tamamlanan' },
    { status: 'started', count: started, label: 'Başlanan' },
    { status: 'not_started', count: notStarted, label: 'Başlanmayan' },
  ]

  return (
    <div className={`progress-status-badges ${className ?? ''}`.trim()}>
      {items.map(({ status, count, label }) => (
        <Badge
          key={status}
          variant={
            status === 'completed'
              ? 'success'
              : status === 'started'
                ? 'warning'
                : 'secondary'
          }
          className="progress-status-badges__item"
        >
          <span className="progress-status-badges__count">{count}</span>
          {label}
        </Badge>
      ))}
    </div>
  )
}
