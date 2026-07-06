import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { BreadcrumbItem } from '../../constants/breadcrumbs'
import { cn } from '../../utils/cn'

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <nav className={cn('breadcrumbs', className)} aria-label="Sayfa yolu">
      <ol className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="breadcrumbs__item">
              {item.to && !isLast ? (
                <Link to={item.to} className="breadcrumbs__link interactive">
                  {item.label}
                </Link>
              ) : (
                <span
                  className="breadcrumbs__current"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  size={14}
                  className="breadcrumbs__separator"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
