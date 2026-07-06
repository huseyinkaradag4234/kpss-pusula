import { Compass } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { appNavItems } from '../../constants/navigation'
import ThemeSwitch from '../common/ThemeSwitch'
import { cn } from '../../utils/cn'

export default function AppSidebar() {
  return (
    <aside className="app-sidebar" aria-label="Ana navigasyon">
      <div className="app-sidebar__header">
        <NavLink to="/dashboard" className="app-sidebar__brand interactive" end>
          <span className="app-sidebar__brand-icon" aria-hidden="true">
            <Compass size={20} />
          </span>
          <span className="app-sidebar__brand-text">KPSS Pusula</span>
        </NavLink>
      </div>

      <nav className="app-sidebar__nav">
        <ul className="app-sidebar__list">
          {appNavItems.map(({ id, label, to, icon: Icon, end }) => (
            <li key={id}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'app-sidebar__link interactive',
                    isActive && 'app-sidebar__link--active',
                  )
                }
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="app-sidebar__footer">
        <ThemeSwitch />
      </div>
    </aside>
  )
}
