export interface Subject {
  id: string
  name: string
  slug: string
  description: string
  topicCount: number
  questionCount: number
  progress: number
  color: string
}

export interface Topic {
  id: string
  subjectId: string
  name: string
  slug: string
  description: string
  questionCount: number
  completedCount: number
  progress: number
}

export interface Question {
  id: string
  topicId: string
  subjectId: string
  text: string
  options: string[]
  correctIndex: number
  difficulty: 'easy' | 'medium' | 'hard'
  explanation?: string
}

export interface Exam {
  id: string
  title: string
  description: string
  subjectId?: string
  questionCount: number
  durationMinutes: number
  type: 'practice' | 'mock' | 'topic'
}

export interface ExamResult {
  id: string
  examId: string
  examTitle: string
  score: number
  correctCount: number
  wrongCount: number
  emptyCount: number
  completedAt: string
}

export interface Favorite {
  id: string
  questionId: string
  questionText: string
  subjectName: string
  addedAt: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress: number
  target: number
}

export interface DailyGoal {
  id: string
  targetQuestions: number
  completedQuestions: number
  date: string
}

export interface Progress {
  id: string
  subjectId: string
  subjectName: string
  topicId?: string
  topicName?: string
  completedQuestions: number
  totalQuestions: number
  lastStudiedAt: string
  progress: number
}

export interface DashboardStats {
  dailyGoal: DailyGoal
  todaySolved: number
  yesterdaySolved: number
  streak: number
  longestStreak: number
  lastExamResult: ExamResult
  successRate: number
  successRateTrend: number
}

export interface ContinueStudy {
  topicId: string
  title: string
  subject: string
  lesson: string
  progress: number
  remaining: string
}

export interface RecentStudy {
  id: string
  title: string
  subject: string
  progress: number
  lastStudied: string
}

export interface QuickActionItem {
  id: string
  label: string
  description: string
  to: string
}
