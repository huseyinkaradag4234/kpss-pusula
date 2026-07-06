import type { Difficulty, Question, Subject, Topic } from '../types'

const SUBJECT_DEFINITIONS = [
  {
    id: 'turkce',
    name: 'Türkçe',
    slug: 'turkce',
    description: 'Sözcük bilgisi, anlam bilgisi ve paragraf',
    icon: 'book-text',
    color: '#6366f1',
    topics: [
      { name: 'Sözcükte Anlam', slug: 'sozcukte-anlam', difficulty: 'medium' as Difficulty },
      { name: 'Cümlede Anlam', slug: 'cumlede-anlam', difficulty: 'medium' as Difficulty },
      { name: 'Paragraf', slug: 'paragraf', difficulty: 'hard' as Difficulty },
      { name: 'Yazım Kuralları', slug: 'yazim-kurallari', difficulty: 'easy' as Difficulty },
    ],
  },
  {
    id: 'matematik',
    name: 'Matematik',
    slug: 'matematik',
    description: 'Temel matematik ve problem çözme',
    icon: 'calculator',
    color: '#0d9488',
    topics: [
      { name: 'Temel Kavramlar', slug: 'temel-kavramlar', difficulty: 'easy' as Difficulty },
      { name: 'Problemler', slug: 'problemler', difficulty: 'hard' as Difficulty },
      { name: 'Oran-Orantı', slug: 'oran-oranti', difficulty: 'medium' as Difficulty },
    ],
  },
  {
    id: 'tarih',
    name: 'Tarih',
    slug: 'tarih',
    description: 'Osmanlı, inkılap ve çağdaş tarih',
    icon: 'landmark',
    color: '#f59e0b',
    topics: [
      { name: 'Osmanlı Kuruluş', slug: 'osmanli-kurulus', difficulty: 'medium' as Difficulty },
      { name: 'İnkılap Tarihi', slug: 'inkilap-tarihi', difficulty: 'medium' as Difficulty },
      { name: 'Atatürk İlkeleri', slug: 'ataturk-ilkeleri', difficulty: 'easy' as Difficulty },
    ],
  },
  {
    id: 'cografya',
    name: 'Coğrafya',
    slug: 'cografya',
    description: 'Fiziki ve beşeri coğrafya',
    icon: 'globe',
    color: '#22c55e',
    topics: [
      { name: 'Türkiye Fiziki Coğrafya', slug: 'turkiye-fiziki', difficulty: 'medium' as Difficulty },
      { name: 'İklim Bilgisi', slug: 'iklim', difficulty: 'medium' as Difficulty },
      { name: 'Beşeri Coğrafya', slug: 'beseri-cografya', difficulty: 'easy' as Difficulty },
    ],
  },
  {
    id: 'vatandaslik',
    name: 'Vatandaşlık',
    slug: 'vatandaslik',
    description: 'Anayasa ve temel haklar',
    icon: 'scale',
    color: '#8b5cf6',
    topics: [
      { name: 'Anayasa', slug: 'anayasa', difficulty: 'medium' as Difficulty },
      { name: 'Temel Haklar', slug: 'temel-haklar', difficulty: 'easy' as Difficulty },
      { name: 'Yasama ve Yürütme', slug: 'yasama-yurutme', difficulty: 'hard' as Difficulty },
    ],
  },
  {
    id: 'guncel',
    name: 'Güncel Bilgiler',
    slug: 'guncel',
    description: 'Güncel olaylar ve kurumlar',
    icon: 'newspaper',
    color: '#ef4444',
    topics: [
      { name: 'Uluslararası Kuruluşlar', slug: 'uluslararasi', difficulty: 'medium' as Difficulty },
      { name: 'Türkiye Gündemi', slug: 'turkiye-gundemi', difficulty: 'easy' as Difficulty },
    ],
  },
] as const

const QUESTION_TEMPLATES = [
  {
    title: 'Kavram Sorusu',
    text: 'Aşağıdakilerden hangisi verilen tanıma en uygun seçenektir?',
    options: [
      'Birinci seçenek ifadesi',
      'İkinci seçenek ifadesi',
      'Üçüncü seçenek ifadesi',
      'Dördüncü seçenek ifadesi',
    ] as [string, string, string, string],
    explanation:
      'Bu soruda doğru cevap, tanımın özelliklerine en uygun ifadeyi bulmayı gerektirir. Anahtar kavramları işaretleyerek eleme yapın.',
  },
  {
    title: 'Uygulama Sorusu',
    text: 'Verilen bilgilere göre aşağıdaki yorumlardan hangisi doğrudur?',
    options: [
      'Yorum A doğru sonuca ulaşır',
      'Yorum B eksik değerlendirme yapar',
      'Yorum C yanlış çıkarım içerir',
      'Yorum D konu dışıdır',
    ] as [string, string, string, string],
    explanation:
      'Uygulama sorularında önce verilen bilgileri sırayla değerlendirin, ardından seçenekleri tek tek eleyin.',
  },
  {
    title: 'Analiz Sorusu',
    text: 'Bu konuyla ilgili aşağıdaki ifadelerden hangisi kesinlikle yanlıştır?',
    options: [
      'Genel geçer bir kural ifadesi',
      'Örnekle desteklenen bilgi',
      'Konuyla ilgili istisna durumu',
      'Yanlış kabul edilen yaygın bilgi',
    ] as [string, string, string, string],
    explanation:
      'Analiz sorularında "kesinlikle yanlış" ifadesine dikkat edin. Mutlak ifadeler genelde tuzak niteliğindedir.',
  },
  {
    title: 'Karşılaştırma Sorusu',
    text: 'İki kavram arasındaki temel fark aşağıdakilerden hangisinde doğru verilmiştir?',
    options: [
      'Kavram A daha geniş kapsamlıdır',
      'Kavram B daha dar tanımlıdır',
      'Her iki kavram eş anlamlıdır',
      'Kavramlar farklı alanlara aittir',
    ] as [string, string, string, string],
    explanation:
      'Karşılaştırma sorularında kavramların kapsam, amaç ve kullanım alanlarını ayırt edin.',
  },
  {
    title: 'Sentez Sorusu',
    text: 'Tüm bilgiler bir arada değerlendirildiğinde en doğru sonuç hangisidir?',
    options: [
      'Sonuç I',
      'Sonuç II',
      'Sonuç III',
      'Sonuç IV',
    ] as [string, string, string, string],
    explanation:
      'Sentez sorularında parça bilgileri birleştirerek bütüncül bir sonuca ulaşmanız gerekir.',
  },
]

function buildTopics(): Topic[] {
  return SUBJECT_DEFINITIONS.flatMap((subject) =>
    subject.topics.map((topic, index) => {
      const solved = [12, 8, 20, 5, 15, 3, 10, 7, 18, 4, 9, 11, 6, 14, 2, 13, 8, 5][
        index % 18
      ]
      const total = 20
      const correctRate = [72, 85, 60, 90, 68, 78, 55, 82, 74, 88, 65, 70, 80, 58, 92, 76, 63, 86][
        index % 18
      ]

      return {
        id: `topic-${subject.id}-${topic.slug}`,
        subjectId: subject.id,
        name: topic.name,
        slug: topic.slug,
        description: `${subject.name} — ${topic.name} konusu`,
        difficulty: topic.difficulty,
        questionCount: total,
        solvedCount: solved,
        correctRate,
        completedCount: solved,
        progress: Math.round((solved / total) * 100),
      }
    }),
  )
}

function buildSubjects(topics: Topic[]): Subject[] {
  const now = Date.now()

  return SUBJECT_DEFINITIONS.map((subject, index) => {
    const subjectTopics = topics.filter((t) => t.subjectId === subject.id)
    const completedTopics = subjectTopics.filter((t) => t.progress >= 80).length
    const totalQuestions = subjectTopics.reduce((sum, t) => sum + t.questionCount, 0)
    const solvedQuestions = subjectTopics.reduce((sum, t) => sum + t.solvedCount, 0)
    const progress =
      totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0

    return {
      id: subject.id,
      name: subject.name,
      slug: subject.slug,
      description: subject.description,
      icon: subject.icon,
      topicCount: subjectTopics.length,
      completedTopicCount: completedTopics,
      questionCount: totalQuestions,
      progress,
      color: subject.color,
      lastStudiedAt: new Date(now - index * 6 * 60 * 60 * 1000).toISOString(),
    }
  })
}

function buildQuestions(topics: Topic[]): Question[] {
  return topics.flatMap((topic) =>
    QUESTION_TEMPLATES.map((template, index) => ({
      id: `${topic.id}-q${index + 1}`,
      topicId: topic.id,
      subjectId: topic.subjectId,
      title: `${template.title} ${index + 1}`,
      text: `${topic.name}: ${template.text}`,
      options: template.options,
      correctIndex: index % 4,
      difficulty: topic.difficulty,
      explanation: `${template.explanation} (${topic.name})`,
    })),
  )
}

export const mockTopics = buildTopics()
export const mockSubjects = buildSubjects(mockTopics)
export const mockQuestions = buildQuestions(mockTopics)

export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

export function getTopicsBySubjectId(subjectId: string): Topic[] {
  return mockTopics.filter((t) => t.subjectId === subjectId)
}

export function getTopicById(id: string): Topic | undefined {
  return mockTopics.find((t) => t.id === id)
}

export function getQuestionsByTopicId(topicId: string): Question[] {
  return mockQuestions.filter((q) => q.topicId === topicId)
}

export function getQuestionById(id: string): Question | undefined {
  return mockQuestions.find((q) => q.id === id)
}

// Legacy exports for other modules
export const mockExams = [
  {
    id: 'exam-1',
    title: 'Genel Yetenek Denemesi #12',
    description: '120 soruluk tam KPSS denemesi',
    questionCount: 120,
    durationMinutes: 130,
    type: 'mock' as const,
  },
]

export const mockExamResults = [
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

export const mockAchievements = [
  {
    id: 'ach-1',
    title: '7 Gün Seri',
    description: '7 gün üst üste çalış',
    icon: 'trophy',
    unlockedAt: '2026-07-01T00:00:00Z',
    progress: 7,
    target: 7,
  },
]

export const mockDailyGoal = {
  id: 'goal-today',
  targetQuestions: 50,
  completedQuestions: 0,
  date: new Date().toISOString().split('T')[0] ?? '',
}

export const mockProgress = mockTopics.slice(0, 3).map((topic, index) => {
  const subject = getSubjectById(topic.subjectId)
  return {
    id: `prog-${topic.id}`,
    subjectId: topic.subjectId,
    subjectName: subject?.name ?? '',
    topicId: topic.id,
    topicName: topic.name,
    completedQuestions: topic.solvedCount,
    totalQuestions: topic.questionCount,
    lastStudiedAt: new Date(Date.now() - index * 8 * 60 * 60 * 1000).toISOString(),
    progress: topic.progress,
  }
})

export function getExamById(id: string) {
  return mockExams.find((e) => e.id === id)
}
