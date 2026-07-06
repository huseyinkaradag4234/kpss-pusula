import type { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from '../../../components/ui'
import type { ContentSortOption, ContentStatusFilter } from '../hooks/useContentFilter'

interface ContentFilterBarProps {
  query: string
  onQueryChange: (value: string) => void
  sort: ContentSortOption
  onSortChange: (value: ContentSortOption) => void
  status: ContentStatusFilter
  onStatusChange: (value: ContentStatusFilter) => void
  resultCount: number
  totalCount: number
  searchPlaceholder?: string
}

const SORT_OPTIONS: { value: ContentSortOption; label: string }[] = [
  { value: 'az', label: 'A-Z' },
  { value: 'progress', label: 'İlerleme' },
]

const STATUS_OPTIONS: { value: ContentStatusFilter; label: string }[] = [
  { value: 'all', label: 'Tümü' },
  { value: 'completed', label: 'Tamamlanan' },
  { value: 'started', label: 'Başlanan' },
  { value: 'not_started', label: 'Başlanmayan' },
]

export default function ContentFilterBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  status,
  onStatusChange,
  resultCount,
  totalCount,
  searchPlaceholder = 'Ara...',
}: ContentFilterBarProps) {
  return (
    <div className="content-filter">
      <div className="content-filter__search">
        <Search size={18} className="content-filter__search-icon" aria-hidden="true" />
        <Input
          type="search"
          value={query}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onQueryChange(event.target.value)}
          placeholder={searchPlaceholder}
          aria-label="Arama"
          inputClassName="content-filter__input"
        />
      </div>

      <div className="content-filter__controls">
        <div className="content-filter__group" role="group" aria-label="Sıralama">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`content-filter__chip interactive${
                sort === option.value ? ' content-filter__chip--active' : ''
              }`}
              onClick={() => onSortChange(option.value)}
              aria-pressed={sort === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="content-filter__group" role="group" aria-label="Durum filtresi">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`content-filter__chip interactive${
                status === option.value ? ' content-filter__chip--active' : ''
              }`}
              onClick={() => onStatusChange(option.value)}
              aria-pressed={status === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <p className="content-filter__meta text-caption">
        {resultCount} / {totalCount} sonuç
      </p>
    </div>
  )
}
