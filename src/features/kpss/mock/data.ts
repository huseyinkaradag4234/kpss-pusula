import type {
  Achievement,
  DailyGoal,
  Exam,
  ExamResult,
  Favorite,
  Progress,
  Question,
  Subject,
  Topic,
} from '../types'

export const mockSubjects: Subject[] = [
  {
    id: 'turkce',
    name: 'Türkçe',
    slug: 'turkce',
    description: 'Sözcük bilgisi, anlam bilgisi ve paragraf',
    topicCount: 24,
    questionCount: 480,
    progress: 62,
    color: '#6366f1',
  },
  {
    id: 'matematik',
    name: 'Matematik',
    slug: 'matematik',
    description: 'Temel matematik ve problem çözme',
    topicCount: 18,
    questionCount: 360,
    progress: 45,
    color: '#0d9488',
  },
  {
    id: 'tarih',
    name: 'Tarih',
    slug: 'tarih',
    description: 'Osmanlı, inkılap ve çağdaş tarih',
    topicCount: 20,
    questionCount: 400,
    progress: 78,
    color: '#f59e0b',
  },
  {
    id: 'cografya',
    name: 'Coğrafya',
    slug: 'cografya',
    description: 'Fiziki ve beşeri coğrafya',
    topicCount: 16,
    questionCount: 320,
    progress: 51,
    color: '#22c55e',
  },
]

export const mockTopics: Topic[] = [
  {
    id: 'topic-turkce-1',
    subjectId: 'turkce',
    name: 'Sözcükte Anlam',
    slug: 'sozcukte-anlam',
    description: 'Gerçek, mecaz ve terim anlam',
    questionCount: 40,
    completedCount: 29,
    progress: 72,
  },
  {
    id: 'topic-matematik-1',
    subjectId: 'matematik',
    name: 'Problemler',
    slug: 'problemler',
    description: 'Sayı ve yaş problemleri',
    questionCount: 35,
    completedCount: 16,
    progress: 45,
  },
  {
    id: 'topic-tarih-1',
    subjectId: 'tarih',
    name: 'İnkılap Tarihi',
    slug: 'inkilap-tarihi',
    description: 'Atatürk ilkeleri ve inkılaplar',
    questionCount: 50,
    completedCount: 29,
    progress: 58,
  },
]

export const mockQuestions: Question[] = [
  {
    id: 'q-1',
    topicId: 'topic-turkce-1',
    subjectId: 'turkce',
    text: 'Aşağıdaki cümlelerin hangisinde "yürek" sözcüğü mecaz anlamda kullanılmıştır?',
    options: ['Yüreği hızla atıyordu', 'Yürek hastalığı geçiriyordu', 'Yüreği çok temiz bir insandı', 'Göğsüne bastı'],
    correctIndex: 2,
    difficulty: 'medium',
  },
]

export const mockExams: Exam[] = [
  {
    id: 'exam-1',
    title: 'Genel Yetenek Denemesi #12',
    description: '120 soruluk tam KPSS denemesi',
    questionCount: 120,
    durationMinutes: 130,
    type: 'mock',
  },
  {
    id: 'exam-2',
    title: 'Türkçe Konu Testi',
    description: 'Sözcükte anlam odaklı test',
    subjectId: 'turkce',
    questionCount: 20,
    durationMinutes: 25,
    type: 'topic',
  },
]

export const mockExamResults: ExamResult[] = [
  {
    id: 'result-1',
    examId: 'exam-1',
    examTitle: 'Genel Yetenek Denemesi #12',
    score: 78.5,
    correctCount: 94,
    wrongCount: 18,
    emptyCount: 8,
    completedAt: '2026-07-05T14:30:00Z',
  },
]

export const mockFavorites: Favorite[] = [
  {
    id: 'fav-1',
    questionId: 'q-1',
    questionText: 'Aşağıdaki cümlelerin hangisinde "yürek" sözcüğü mecaz anlamda kullanılmıştır?',
    subjectName: 'Türkçe',
    addedAt: '2026-07-04T10:00:00Z',
  },
]

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '7 Gün Seri',
    description: '7 gün üst üste çalış',
    icon: 'trophy',
    unlockedAt: '2026-07-01T00:00:00Z',
    progress: 7,
    target: 7,
  },
  {
    id: 'ach-2',
    title: '1000 Soru',
    description: '1000 soru çöz',
    icon: 'target',
    progress: 640,
    target: 1000,
  },
]

export const mockDailyGoal: DailyGoal = {
  id: 'goal-today',
  targetQuestions: 50,
  completedQuestions: 32,
  date: new Date().toISOString().split('T')[0] ?? '',
}

export const mockProgress: Progress[] = [
  {
    id: 'prog-1',
    subjectId: 'turkce',
    subjectName: 'Türkçe',
    topicId: 'topic-turkce-1',
    topicName: 'Sözcükte Anlam',
    completedQuestions: 29,
    totalQuestions: 40,
    lastStudiedAt: '2026-07-06T14:00:00Z',
    progress: 72,
  },
  {
    id: 'prog-2',
    subjectId: 'matematik',
    subjectName: 'Matematik',
    topicId: 'topic-matematik-1',
    topicName: 'Problemler',
    completedQuestions: 16,
    totalQuestions: 35,
    lastStudiedAt: '2026-07-05T18:00:00Z',
    progress: 45,
  },
  {
    id: 'prog-3',
    subjectId: 'tarih',
    subjectName: 'Tarih',
    topicId: 'topic-tarih-1',
    topicName: 'Osmanlı Kuruluş',
    completedQuestions: 45,
    totalQuestions: 50,
    lastStudiedAt: '2026-07-04T11:00:00Z',
    progress: 90,
  },
]

export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

export function getTopicById(id: string): Topic | undefined {
  return mockTopics.find((t) => t.id === id)
}

export function getExamById(id: string): Exam | undefined {
  return mockExams.find((e) => e.id === id)
}
