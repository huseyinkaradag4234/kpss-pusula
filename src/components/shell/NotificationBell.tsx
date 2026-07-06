import { Bell } from 'lucide-react'
import { cn } from '../../utils/cn'

interface NotificationBellProps {
  count?: number
  className?: string
}

export default function NotificationBell({
  count = 3,
  className,
}: NotificationBellProps) {
  return (
    <button
      type="button"
      className={cn('notification-bell interactive', className)}
      aria-label={`Bildirimler${count > 0 ? `, ${count} okunmamış` : ''}`}
    >
      <Bell size={20} aria-hidden="true" />
      {count > 0 ? (
        <span className="notification-bell__badge" aria-hidden="true">
          {count > 9 ? '9+' : count}
        </span>
      ) : null}
    </button>
  )
}
