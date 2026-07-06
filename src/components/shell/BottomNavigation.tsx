import { NavLink } from 'react-router-dom'
import { bottomNavItems } from '../../constants/navigation'
import { cn } from '../../utils/cn'

export default function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Mobil navigasyon">
      <ul className="bottom-nav__list">
        {bottomNavItems.map(({ id, label, shortLabel, to, icon: Icon, end }) => (
          <li key={id} className="bottom-nav__item">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                cn(
                  'bottom-nav__link interactive',
                  isActive && 'bottom-nav__link--active',
                )
              }
            >
              <Icon size={22} aria-hidden="true" />
              <span>{shortLabel ?? label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
