import type { RouteObject } from 'react-router-dom'
import {
  LazyAchievementsPage,
  LazyDailyGoalsPage,
  LazyDashboardPage,
  LazyExamDetailPage,
  LazyExamsPage,
  LazyFavoritesPage,
  LazyProfilePage,
  LazyProgressPage,
  LazyQuestionBankPage,
  LazyStatisticsPage,
  LazySubjectDetailPage,
  LazySubjectsPage,
  LazyTopicDetailPage,
} from './lazy-pages'

export const dashboardRoutes: RouteObject[] = [
  { path: '/dashboard', element: <LazyDashboardPage /> },
  { path: '/profile', element: <LazyProfilePage /> },
  { path: '/subjects', element: <LazySubjectsPage /> },
  { path: '/subjects/:id', element: <LazySubjectDetailPage /> },
  { path: '/topics/:id', element: <LazyTopicDetailPage /> },
  { path: '/question-bank', element: <LazyQuestionBankPage /> },
  { path: '/exams', element: <LazyExamsPage /> },
  { path: '/exams/:id', element: <LazyExamDetailPage /> },
  { path: '/progress', element: <LazyProgressPage /> },
  { path: '/favorites', element: <LazyFavoritesPage /> },
  { path: '/statistics', element: <LazyStatisticsPage /> },
  { path: '/achievements', element: <LazyAchievementsPage /> },
  { path: '/daily-goals', element: <LazyDailyGoalsPage /> },
]
