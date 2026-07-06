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

export interface QuickActionView extends QuickActionItem {
  icon: LucideIcon
}

function formatRelativeTime(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return 'Az önce'
  if (hours < 24) return `${hours} saat önce`
  if (hours < 48) return 'Dün'
  return `${Math.floor(hours / 24)} gün önce`
}

export function getDashboardStatCards(): DashboardStatView[] {
  const dailyGoal = mockDailyGoal
  const lastExam = mockExamResults[0]
  const goalPercent = Math.round(
    (dailyGoal.completedQuestions / dailyGoal.targetQuestions) * 100,
  )
  const todaySolved = dailyGoal.completedQuestions
  const yesterdaySolved = 28
  const streak = 12
  const longestStreak = 18
  const successRate = 84
  const successRateTrend = 2

  return [
    {
      id: 'daily-goal',
      title: 'Günlük Hedef',
      value: `${dailyGoal.completedQuestions} / ${dailyGoal.targetQuestions}`,
      subtitle: 'soru tamamlandı',
      icon: Target,
      accent: 'primary',
      trend: `%${goalPercent}`,
    },
    {
      id: 'today-solved',
      title: 'Bugün Çözülen Soru',
      value: String(todaySolved),
      subtitle: `dün: ${yesterdaySolved} soru`,
      icon: Zap,
      accent: 'secondary',
      trend: `+${todaySolved - yesterdaySolved}`,
    },
    {
      id: 'streak',
      title: 'Çalışma Serisi',
      value: `${streak} gün`,
      subtitle: `en uzun seri: ${longestStreak}`,
      icon: Trophy,
      accent: 'warning',
    },
    {
      id: 'last-exam',
      title: 'Son Deneme',
      value: String(lastExam?.score ?? 0),
      subtitle: lastExam?.examTitle ?? 'Henüz deneme yok',
      icon: ClipboardList,
      accent: 'success',
      trend: '+3.2',
    },
    {
      id: 'success-rate',
      title: 'Başarı Oranı',
      value: `%${successRate}`,
      subtitle: 'son 7 gün ortalaması',
      icon: TrendingUp,
      accent: 'primary',
      trend: `+${successRateTrend}%`,
    },
  ]
}

export function getQuickActions(): QuickActionView[] {
  return [
    {
      id: 'solve-test',
      label: 'Test Çöz',
      description: 'Yeni teste başla',
      to: KPSS_ROUTES.exams,
      icon: ClipboardList,
    },
    {
      id: 'topics',
      label: 'Konular',
      description: 'Konu listesine git',
      to: KPSS_ROUTES.subjects,
      icon: BookOpen,
    },
    {
      id: 'mistakes',
      label: 'Yanlışlarım',
      description: 'Tekrar çöz',
      to: KPSS_ROUTES.questionBank,
      icon: RotateCcw,
    },
    {
      id: 'favorites',
      label: 'Favorilerim',
      description: 'Kayıtlı sorular',
      to: KPSS_ROUTES.favorites,
      icon: Heart,
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

  return {
    topicId: topic?.id ?? '',
    title: `Tarih — ${topic?.name ?? 'İnkılap Tarihi'}`,
    subject: 'Tarih',
    lesson: topic?.description ?? 'Atatürk İlkeleri',
    progress: topic?.progress ?? 58,
    remaining: `${(topic?.questionCount ?? 50) - (topic?.completedCount ?? 29)} soru kaldı`,
  }
}
