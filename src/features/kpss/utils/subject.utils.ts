import {
  BookText,
  Calculator,
  Globe,
  Landmark,
  Newspaper,
  Scale,
  type LucideIcon,
} from 'lucide-react'

const SUBJECT_ICON_MAP: Record<string, LucideIcon> = {
  'book-text': BookText,
  calculator: Calculator,
  landmark: Landmark,
  globe: Globe,
  scale: Scale,
  newspaper: Newspaper,
}

export function getSubjectIcon(iconKey: string): LucideIcon {
  return SUBJECT_ICON_MAP[iconKey] ?? BookText
}

export function formatStudyDate(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (hours < 1) return 'Az önce'
  if (hours < 24) return `${hours} saat önce`
  if (hours < 48) return 'Dün'
  return `${Math.floor(hours / 24)} gün önce`
}

export function getDifficultyLabel(difficulty: string): string {
  const labels: Record<string, string> = {
    easy: 'Kolay',
    medium: 'Orta',
    hard: 'Zor',
  }
  return labels[difficulty] ?? difficulty
}

export function getDifficultyVariant(
  difficulty: string,
): 'success' | 'warning' | 'danger' {
  if (difficulty === 'easy') return 'success'
  if (difficulty === 'hard') return 'danger'
  return 'warning'
}

export function formatStudyDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} dk`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return remaining > 0 ? `${hours} sa ${remaining} dk` : `${hours} sa`
}

export function getStudyStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    completed: 'Tamamlanan',
    started: 'Başlanan',
    not_started: 'Başlanmayan',
  }
  return labels[status] ?? status
}

export function getStudyStatusVariant(
  status: string,
): 'success' | 'warning' | 'secondary' {
  if (status === 'completed') return 'success'
  if (status === 'started') return 'warning'
  return 'secondary'
}
