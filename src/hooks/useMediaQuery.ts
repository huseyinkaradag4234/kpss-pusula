import { useEffect, useState } from 'react'
import { getMediaQuery } from '../utils/theme'
import type { Breakpoint } from '../constants/breakpoints'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.matchMedia(query).matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(getMediaQuery(breakpoint))
}

export function useIsMobile(): boolean {
  return useMediaQuery(getMediaQuery('md', 'max'))
}

export function useIsTablet(): boolean {
  const isAboveMobile = useMediaQuery(getMediaQuery('md'))
  const isBelowDesktop = useMediaQuery(getMediaQuery('lg', 'max'))
  return isAboveMobile && isBelowDesktop
}

export function useIsDesktop(): boolean {
  return useMediaQuery(getMediaQuery('lg'))
}
