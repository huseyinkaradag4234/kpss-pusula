import { Compass, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeSwitch from '../common/ThemeSwitch'
import { cn } from '../../utils/cn'

const navItems = [
  { to: '/', label: 'Ana Sayfa', end: true },
  { to: '/login', label: 'Giriş', end: false },
  { to: '/register', label: 'Kayıt Ol', end: false },
] as const

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar__inner" aria-label="Ana menü">
        <NavLink
          to="/"
          className="navbar__brand interactive"
          end
          onClick={() => setMenuOpen(false)}
        >
          <span className="navbar__brand-icon" aria-hidden="true">
            <Compass size={18} />
          </span>
          KPSS Pusula
        </NavLink>

        <ul
          id="main-navigation"
          className={cn('navbar__menu', menuOpen && 'navbar__menu--open')}
        >
          {navItems.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'navbar__link interactive',
                    isActive && 'navbar__link--active',
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <ThemeSwitch />
          <button
            type="button"
            className="navbar__toggle interactive"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
    </header>
  )
}
