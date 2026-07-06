import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { THEME_STORAGE_KEY, type ResolvedTheme, type ThemeMode } from '../types/theme'
import { resolveSystemTheme } from '../utils/theme'
import { ThemeContext, type ThemeContextValue } from './ThemeContext'

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: ThemeMode
}

function getStoredTheme(): ThemeMode | null {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = localStorage.getItem(THEME_STORAGE_KEY)

  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }

  return null
}

function applyTheme(resolvedTheme: ResolvedTheme): void {
  document.documentElement.setAttribute('data-theme', resolvedTheme)
  document.documentElement.style.colorScheme = resolvedTheme
}

export default function ThemeProvider({
  children,
  defaultTheme = 'system',
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(
    () => getStoredTheme() ?? defaultTheme,
  )
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() =>
    theme === 'system' ? resolveSystemTheme() : theme,
  )

  useEffect(() => {
    const nextResolved = theme === 'system' ? resolveSystemTheme() : theme
    setResolvedTheme(nextResolved)
    applyTheme(nextResolved)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (theme !== 'system') {
      return
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => {
      const nextResolved = resolveSystemTheme()
      setResolvedTheme(nextResolved)
      applyTheme(nextResolved)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [theme])

  const setTheme = (nextTheme: ThemeMode) => {
    setThemeState(nextTheme)
  }

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
