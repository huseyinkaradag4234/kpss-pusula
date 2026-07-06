import { useLocation } from 'react-router-dom'
import { breadcrumbMap } from '../../constants/breadcrumbs'
import { useIsMobile } from '../../hooks/useMediaQuery'
import Breadcrumbs from './Breadcrumbs'
import NotificationBell from './NotificationBell'
import SearchBar from './SearchBar'
import UserProfileMenu from './UserProfileMenu'

export default function DashboardHeader() {
  const location = useLocation()
  const isMobile = useIsMobile()
  const breadcrumbs = breadcrumbMap[location.pathname] ?? [{ label: 'Panel' }]

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__left">
        <Breadcrumbs items={breadcrumbs} />
      </div>

      <div className="dashboard-header__center">
        <SearchBar collapsible={isMobile} />
      </div>

      <div className="dashboard-header__right">
        <NotificationBell />
        <UserProfileMenu />
      </div>
    </header>
  )
}
