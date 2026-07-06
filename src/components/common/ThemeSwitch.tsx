import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import type { ThemeMode } from '../../types/theme'
import { cn } from '../../utils/cn'

const themeOptions: Array<{ value: ThemeMode; label: string; icon: typeof Sun }> = [
  { value: 'light', label: 'Açık', icon: Sun },
  { value: 'dark', label: 'Koyu', icon: Moon },
  { value: 'system', label: 'Sistem', icon: Monitor },
]

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="theme-switch" role="group" aria-label="Tema seçimi">
      {themeOptions.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          type="button"
          className={cn(
            'theme-switch__btn interactive',
            theme === value && 'theme-switch__btn--active',
          )}
          onClick={() => setTheme(value)}
          aria-pressed={theme === value}
          aria-label={`${label} tema`}
          title={label}
        >
          <Icon size={16} aria-hidden="true" />
          <span className="theme-switch__label">{label}</span>
        </button>
      ))}
    </div>
  )
}
