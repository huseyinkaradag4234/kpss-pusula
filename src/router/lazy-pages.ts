import { lazy } from 'react'

export const LazyDashboardPage = lazy(
  () => import('../pages/DashboardPage/DashboardPage'),
)
export const LazyProfilePage = lazy(
  () => import('../pages/ProfilePage/ProfilePage'),
)
export const LazySubjectsPage = lazy(
  () => import('../features/kpss/subjects/pages/SubjectsPage'),
)
export const LazySubjectDetailPage = lazy(
  () => import('../features/kpss/subjects/pages/SubjectDetailPage'),
)
export const LazyTopicDetailPage = lazy(
  () => import('../features/kpss/topics/pages/TopicDetailPage'),
)
export const LazyStudyPage = lazy(
  () => import('../features/kpss/study/pages/StudyPage'),
)
export const LazyQuestionBankPage = lazy(
  () => import('../features/kpss/question-bank/pages/QuestionBankPage'),
)
export const LazyExamsPage = lazy(
  () => import('../features/kpss/exams/pages/ExamsPage'),
)
export const LazyExamDetailPage = lazy(
  () => import('../features/kpss/exams/pages/ExamDetailPage'),
)
export const LazyProgressPage = lazy(
  () => import('../features/kpss/progress/pages/ProgressPage'),
)
export const LazyFavoritesPage = lazy(
  () => import('../features/kpss/favorites/pages/FavoritesPage'),
)
export const LazyStatisticsPage = lazy(
  () => import('../features/kpss/statistics/pages/StatisticsPage'),
)
export const LazyAchievementsPage = lazy(
  () => import('../features/kpss/achievements/pages/AchievementsPage'),
)
export const LazyDailyGoalsPage = lazy(
  () => import('../features/kpss/daily-goals/pages/DailyGoalsPage'),
)
