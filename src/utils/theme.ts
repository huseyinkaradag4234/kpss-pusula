import { BREAKPOINTS, type Breakpoint } from '../constants/breakpoints'

export function getMediaQuery(breakpoint: Breakpoint, direction: 'min' | 'max' = 'min'): string {
  const value = BREAKPOINTS[breakpoint]

  if (direction === 'min') {
    return `(min-width: ${value}px)`
  }

  return `(max-width: ${value - 1}px)`
}

export function resolveSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}
