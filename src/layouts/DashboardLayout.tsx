import AppSidebar from '../components/shell/AppSidebar'
import BottomNavigation from '../components/shell/BottomNavigation'
import DashboardHeader from '../components/shell/DashboardHeader'
import PageTransition from '../components/shell/PageTransition'

export default function DashboardLayout() {
  return (
    <div className="dashboard-shell">
      <AppSidebar />
      <div className="dashboard-shell__body">
        <DashboardHeader />
        <main className="dashboard-shell__content" id="main-content">
          <PageTransition />
        </main>
      </div>
      <BottomNavigation />
    </div>
  )
}
