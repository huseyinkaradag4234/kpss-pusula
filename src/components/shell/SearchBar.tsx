import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../utils/cn'

interface SearchBarProps {
  className?: string
  placeholder?: string
  collapsible?: boolean
}

export default function SearchBar({
  className,
  placeholder = 'Konu, test veya soru ara...',
  collapsible = false,
}: SearchBarProps) {
  const [expanded, setExpanded] = useState(!collapsible)
  const [query, setQuery] = useState('')

  if (collapsible && !expanded) {
    return (
      <button
        type="button"
        className={cn('search-bar__toggle interactive', className)}
        onClick={() => setExpanded(true)}
        aria-label="Aramayı aç"
      >
        <Search size={18} aria-hidden="true" />
      </button>
    )
  }

  return (
    <div className={cn('search-bar', className)}>
      <Search size={18} className="search-bar__icon" aria-hidden="true" />
      <input
        type="search"
        className="search-bar__input"
        placeholder={placeholder}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Ara"
      />
      {collapsible ? (
        <button
          type="button"
          className="search-bar__close interactive"
          onClick={() => {
            setExpanded(false)
            setQuery('')
          }}
          aria-label="Aramayı kapat"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  )
}
