import { useKpssBreadcrumbs } from '../../features/kpss/hooks/useKpssBreadcrumbs'
import { useIsMobile } from '../../hooks/useMediaQuery'
import Breadcrumbs from './Breadcrumbs'
import NotificationBell from './NotificationBell'
import SearchBar from './SearchBar'
import UserProfileMenu from './UserProfileMenu'

export default function DashboardHeader() {
  const isMobile = useIsMobile()
  const breadcrumbs = useKpssBreadcrumbs()

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
