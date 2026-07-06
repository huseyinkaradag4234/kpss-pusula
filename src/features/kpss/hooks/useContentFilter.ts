import { useMemo, useState } from 'react'
import type { StudyStatus } from '../types'
import type {
  ContentFilterState,
  ContentSortOption,
  ContentStatusFilter,
} from '../types/filters'

interface UseContentFilterOptions<T> {
  items: T[]
  getSearchText: (item: T) => string
  getStatus: (item: T) => StudyStatus
  getProgress: (item: T) => number
  getName: (item: T) => string
  initial?: Partial<ContentFilterState>
}

export function useContentFilter<T>({
  items,
  getSearchText,
  getStatus,
  getProgress,
  getName,
  initial,
}: UseContentFilterOptions<T>) {
  const [query, setQuery] = useState(initial?.query ?? '')
  const [sort, setSort] = useState<ContentSortOption>(initial?.sort ?? 'az')
  const [status, setStatus] = useState<ContentStatusFilter>(initial?.status ?? 'all')

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('tr')

    let result = items.filter((item) => {
      if (normalizedQuery && !getSearchText(item).toLocaleLowerCase('tr').includes(normalizedQuery)) {
        return false
      }

      if (status === 'all') return true
      return getStatus(item) === status
    })

    result = [...result].sort((a, b) => {
      if (sort === 'progress') {
        return getProgress(b) - getProgress(a)
      }
      return getName(a).localeCompare(getName(b), 'tr')
    })

    return result
  }, [items, query, sort, status, getSearchText, getStatus, getProgress, getName])

  return {
    query,
    setQuery,
    sort,
    setSort,
    status,
    setStatus,
    filteredItems,
    resultCount: filteredItems.length,
    totalCount: items.length,
  }
}

export type { ContentFilterState, ContentSortOption, ContentStatusFilter }
