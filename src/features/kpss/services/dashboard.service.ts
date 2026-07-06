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
  mockExamResults,
  mockProgress,
  mockSubjects,
} from '../mock/data'
import { questionEngineStore } from '../question-engine/store'
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
  const engine = questionEngineStore.getSnapshot()
  const lastExam = mockExamResults[0]
  const targetQuestions = 50
  const todaySolved = engine.todaySolved
  const yesterdaySolved = 28
  const successRate = questionEngineStore.getSuccessRate() || 84
  const goalPercent = Math.round((todaySolved / targetQuestions) * 100)

  return [
    {
      id: 'daily-goal',
      title: 'Günlük Hedef',
      value: `${todaySolved} / ${targetQuestions}`,
      subtitle: 'soru tamamlandı',
      icon: Target,
      accent: 'primary',
      trend: `%${Math.min(goalPercent, 100)}`,
    },
    {
      id: 'today-solved',
      title: 'Bugün Çözülen Soru',
      value: String(todaySolved),
      subtitle: `dün: ${yesterdaySolved} soru`,
      icon: Zap,
      accent: 'secondary',
      trend: todaySolved > 0 ? `+${todaySolved}` : '0',
    },
    {
      id: 'streak',
      title: 'Çalışma Serisi',
      value: '12 gün',
      subtitle: 'en uzun seri: 18',
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
      subtitle: 'bugünkü oturum ortalaması',
      icon: TrendingUp,
      accent: 'primary',
      trend: engine.todaySolved > 0 ? 'canlı' : '+0%',
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
  const topic = getTopicById('topic-tarih-inkilap-tarihi')
  const subject = mockSubjects.find((s) => s.id === 'tarih')

  return {
    topicId: topic?.id ?? 'topic-tarih-inkilap-tarihi',
    title: `${subject?.name ?? 'Tarih'} — ${topic?.name ?? 'İnkılap Tarihi'}`,
    subject: subject?.name ?? 'Tarih',
    lesson: topic?.description ?? 'Atatürk İlkeleri',
    progress: topic?.progress ?? 58,
    remaining: `${(topic?.questionCount ?? 20) - (topic?.solvedCount ?? 12)} soru kaldı`,
  }
}
