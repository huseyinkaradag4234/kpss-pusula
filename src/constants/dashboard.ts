import type { LucideIcon } from 'lucide-react'
import {
  BookOpen,
  ClipboardList,
  Heart,
  RotateCcw,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from 'lucide-react'

export interface DashboardStat {
  id: string
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  accent: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  trend?: string
}

export interface QuickAction {
  id: string
  label: string
  description: string
  icon: LucideIcon
}

export interface RecentStudy {
  id: string
  title: string
  subject: string
  progress: number
  lastStudied: string
}

export const dashboardStats: DashboardStat[] = [
  {
    id: 'daily-goal',
    title: 'Günlük Hedef',
    value: '32 / 50',
    subtitle: 'soru tamamlandı',
    icon: Target,
    accent: 'primary',
    trend: '%64',
  },
  {
    id: 'today-solved',
    title: 'Bugün Çözülen Soru',
    value: '32',
    subtitle: 'dün: 28 soru',
    icon: Zap,
    accent: 'secondary',
    trend: '+4',
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
    value: '78.5',
    subtitle: 'Genel Yetenek denemesi',
    icon: ClipboardList,
    accent: 'success',
    trend: '+3.2',
  },
  {
    id: 'success-rate',
    title: 'Başarı Oranı',
    value: '%84',
    subtitle: 'son 7 gün ortalaması',
    icon: TrendingUp,
    accent: 'primary',
    trend: '+2%',
  },
]

export const quickActions: QuickAction[] = [
  {
    id: 'solve-test',
    label: 'Test Çöz',
    description: 'Yeni teste başla',
    icon: ClipboardList,
  },
  {
    id: 'topics',
    label: 'Konular',
    description: 'Konu listesine git',
    icon: BookOpen,
  },
  {
    id: 'mistakes',
    label: 'Yanlışlarım',
    description: 'Tekrar çöz',
    icon: RotateCcw,
  },
  {
    id: 'favorites',
    label: 'Favorilerim',
    description: 'Kayıtlı sorular',
    icon: Heart,
  },
]

export const recentStudies: RecentStudy[] = [
  {
    id: '1',
    title: 'Türkçe — Sözcükte Anlam',
    subject: 'Türkçe',
    progress: 72,
    lastStudied: '2 saat önce',
  },
  {
    id: '2',
    title: 'Matematik — Problemler',
    subject: 'Matematik',
    progress: 45,
    lastStudied: 'Dün',
  },
  {
    id: '3',
    title: 'Tarih — Osmanlı Kuruluş',
    subject: 'Tarih',
    progress: 90,
    lastStudied: '2 gün önce',
  },
]

export const continueStudy = {
  title: 'Tarih — İnkılap Tarihi',
  subject: 'Tarih',
  lesson: 'Atatürk İlkeleri',
  progress: 58,
  remaining: '12 soru kaldı',
}
