import {
  ClipboardList,
  BookOpen,
  Heart,
  RotateCcw,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { KPSS_ROUTES } from '../constants/routes'
import {
  getTopicById,
  mockDailyGoal,
  mockExamResults,
  mockProgress,
} from '../mock/data'
import type {
  ContinueStudy,
  DashboardStats,
  QuickActionItem,
  RecentStudy,
} from '../types'

export interface DashboardStatView {
  id: string
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  accent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  trend?: string
}

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return 'Az önce'
  if (hours < 24) return `${hours} saat önce`
  if (hours < 48) return 'Dün'
  return `${Math.floor(hours / 24)} gün önce`
}

export function getDashboardStats(): DashboardStats {
  const lastExam = mockExamResults[0]

  return {
    dailyGoal: mockDailyGoal,
    todaySolved: mockDailyGoal.completedQuestions,
    yesterdaySolved: 28,
    streak: 12,
    longestStreak: 18,
    lastExamResult: lastExam ?? {
      id: '',
      examId: '',
      examTitle: 'Henüz deneme yok',
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      emptyCount: 0,
      completedAt: new Date().toISOString(),
    },
    successRate: 84,
    successRateTrend: 2,
  }
}

export function getDashboardStatCards(): DashboardStatView[] {
  const stats = getDashboardStats()
  const goalPercent = Math.round(
    (stats.dailyGoal.completedQuestions / stats.dailyGoal.targetQuestions) * 100,
  )

  return [
    {
      id: 'daily-goal',
      title: 'Günlük Hedef',
      value: `${stats.dailyGoal.completedQuestions} / ${stats.dailyGoal.targetQuestions}`,
      subtitle: 'soru tamamlandı',
      icon: Target,
      accent: 'primary',
      trend: `%${goalPercent}`,
    },
    {
      id: 'today-solved',
      title: 'Bugün Çözülen Soru',
      value: String(stats.todaySolved),
      subtitle: `dün: ${stats.yesterdaySolved} soru`,
      icon: Zap,
      accent: 'secondary',
      trend: `+${stats.todaySolved - stats.yesterdaySolved}`,
    },
    {
      id: 'streak',
      title: 'Çalışma Serisi',
      value: `${stats.streak} gün`,
      subtitle: `en uzun seri: ${stats.longestStreak}`,
      icon: Trophy,
      accent: 'warning',
    },
    {
      id: 'last-exam',
      title: 'Son Deneme',
      value: String(stats.lastExamResult.score),
      subtitle: stats.lastExamResult.examTitle,
      icon: ClipboardList,
      accent: 'success',
      trend: '+3.2',
    },
    {
      id: 'success-rate',
      title: 'Başarı Oranı',
      value: `%${stats.successRate}`,
      subtitle: 'son 7 gün ortalaması',
      icon: TrendingUp,
      accent: 'primary',
      trend: `+${stats.successRateTrend}%`,
    },
  ]
}

export function getQuickActions(): QuickActionItem[] {
  return [
    {
      id: 'solve-test',
      label: 'Test Çöz',
      description: 'Yeni teste başla',
      to: KPSS_ROUTES.exams,
    },
    {
      id: 'topics',
      label: 'Konular',
      description: 'Konu listesine git',
      to: KPSS_ROUTES.subjects,
    },
    {
      id: 'mistakes',
      label: 'Yanlışlarım',
      description: 'Tekrar çöz',
      to: KPSS_ROUTES.questionBank,
    },
    {
      id: 'favorites',
      label: 'Favorilerim',
      description: 'Kayıtlı sorular',
      to: KPSS_ROUTES.favorites,
    },
  ]
}

export function getRecentStudies(): RecentStudy[] {
  return mockProgress.map((item) => ({
    id: item.id,
    title: `${item.subjectName} — ${item.topicName ?? 'Genel'}`,
    subject: item.subjectName,
    progress: item.progress,
    lastStudied: formatRelativeTime(item.lastStudiedAt),
  }))
}

export function getContinueStudy(): ContinueStudy {
  const topic = getTopicById('topic-tarih-1')
  const subject = topic ? 'Tarih' : 'Genel'

  return {
    topicId: topic?.id ?? '',
    title: `${subject} — ${topic?.name ?? 'Çalışmaya devam'}`,
    subject,
    lesson: topic?.description ?? 'Kaldığınız yerden devam edin',
    progress: topic?.progress ?? 0,
    remaining: `${(topic?.questionCount ?? 0) - (topic?.completedCount ?? 0)} soru kaldı`,
  }
}
