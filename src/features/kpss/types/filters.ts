export type ContentSortOption = 'az' | 'progress'

export type ContentStatusFilter = 'all' | 'completed' | 'started' | 'not_started'

export interface ContentFilterState {
  query: string
  sort: ContentSortOption
  status: ContentStatusFilter
}

export const DEFAULT_CONTENT_FILTER: ContentFilterState = {
  query: '',
  sort: 'az',
  status: 'all',
}
