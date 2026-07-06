export const KPSS_ROUTES = {
  dashboard: '/',
  subjects: '/subjects',
  subjectDetail: (id: string) => `/subjects/${id}`,
  topicDetail: (id: string) => `/topics/${id}`,
  study: (subTopicId: string) => `/study/${subTopicId}`,
  questionBank: '/question-bank',
  exams: '/exams',
  examDetail: (id: string) => `/exams/${id}`,
  progress: '/progress',
  favorites: '/favorites',
  statistics: '/statistics',
  achievements: '/achievements',
  dailyGoals: '/daily-goals',
} as const

export const KPSS_ROUTE_LABELS: Record<string, string> = {
  '/': 'Panel',
  '/subjects': 'Dersler',
  '/question-bank': 'Soru Bankası',
  '/exams': 'Denemeler',
  '/progress': 'İlerleme',
  '/favorites': 'Favoriler',
  '/statistics': 'İstatistikler',
  '/achievements': 'Başarılar',
  '/daily-goals': 'Günlük Hedefler',
}
