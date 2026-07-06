import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '../contexts/ThemeContext'

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme yalnızca ThemeProvider içinde kullanılabilir.')
  }

  return context
}
