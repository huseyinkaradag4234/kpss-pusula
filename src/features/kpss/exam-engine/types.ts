import type { Difficulty, StudyStatus } from '../types'

export type ExamCategory =
  | 'genel_yetenek'
  | 'genel_kultur'
  | 'turkce'
  | 'matematik'
  | 'tarih'
  | 'cografya'
  | 'vatandaslik'
  | 'guncel'

export type ExamCategoryFilter = 'all' | ExamCategory

export interface ExamDefinition {
  id: string
  title: string
  description: string
  category: ExamCategory
  subjectName: string
  subjectIds: string[]
  questionCount: number
  durationMinutes: number
  difficulty: Difficulty
  type: 'practice' | 'mock' | 'topic'
}

export interface ExamListItem extends ExamDefinition {
  status: StudyStatus
  lastScore?: number
  lastCompletedAt?: string
}

export interface ExamQuestion {
  id: string
  examId: string
  number: number
  subjectId: string
  subjectName: string
  text: string
  options: [string, string, string, string]
  correctIndex: number
  explanation: string
}

export interface ExamAnswerState {
  selectedIndex: number | null
  marked: boolean
}

export interface ExamSubjectAnalysis {
  subjectId: string
  subjectName: string
  correct: number
  wrong: number
  empty: number
  total: number
  successRate: number
}

export interface ExamSessionResult {
  examId: string
  examTitle: string
  correctCount: number
  wrongCount: number
  emptyCount: number
  net: number
  successRate: number
  totalDurationSeconds: number
  completedAt: string
  subjectBreakdown: ExamSubjectAnalysis[]
  wrongQuestionIds: string[]
}

export interface WrongQuestionRecord {
  id: string
  questionId: string
  examId: string
  examTitle: string
  subjectId: string
  subjectName: string
  text: string
  options: [string, string, string, string]
  correctIndex: number
  selectedIndex: number
  explanation: string
  answeredAt: string
}

export const EXAM_CATEGORY_LABELS: Record<ExamCategoryFilter, string> = {
  all: 'Tümü',
  genel_yetenek: 'Genel Yetenek',
  genel_kultur: 'Genel Kültür',
  turkce: 'Türkçe',
  matematik: 'Matematik',
  tarih: 'Tarih',
  cografya: 'Coğrafya',
  vatandaslik: 'Vatandaşlık',
  guncel: 'Güncel Bilgiler',
}

export const EXAM_RULES = [
  'Süre dolduğunda sınav otomatik olarak sonlandırılır.',
  'İşaretlediğiniz soruları daha sonra tekrar kontrol edebilirsiniz.',
  'Boş bırakılan sorular yanlış sayılmaz, net hesabına dahil edilmez.',
  'KPSS net hesabı: Doğru − (Yanlış ÷ 4)',
  'Sınav sırasında doğru cevap gösterilmez.',
] as const
