import ContinueCard from '../../components/dashboard/ContinueCard'
import QuickActions from '../../components/dashboard/QuickActions'
import RecentStudies from '../../components/dashboard/RecentStudies'
import StatCard from '../../components/dashboard/StatCard'
import { useQuestionEngine } from '../../features/kpss/question-engine/useQuestionEngine'
import {
  getContinueStudy,
  getDashboardStatCards,
  getQuickActions,
  getRecentStudies,
} from '../../features/kpss/services/dashboard.service'

export default function DashboardPage() {
  useQuestionEngine()
  const stats = getDashboardStatCards()
  const quickActions = getQuickActions()
  const recentStudies = getRecentStudies()
  const continueStudy = getContinueStudy()

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <div>
          <h1 className="text-heading">Merhaba, Öğrenci 👋</h1>
          <p className="text-caption dashboard-page__subtitle">
            Bugün hedefinize bir adım daha yaklaşın.
          </p>
        </div>
      </header>

      <ContinueCard {...continueStudy} />

      <section className="dashboard-stats" aria-label="İstatistikler">
        <div className="dashboard-stats__grid">
          {stats.map((stat, index) => (
            <StatCard
              key={stat.id}
              {...stat}
              className="dashboard-stats__item"
              style={{ animationDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
      </section>

      <div className="dashboard-page__grid">
        <QuickActions actions={quickActions} />
        <RecentStudies studies={recentStudies} />
      </div>
    </div>
  )
}
