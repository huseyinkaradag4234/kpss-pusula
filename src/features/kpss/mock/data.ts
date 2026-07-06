import type { StudyStatus, Subject, SubTopic, Topic } from '../types'
import {
  mockQuestions,
  mockSubjects,
  mockSubTopics,
  mockTopics,
} from './builders'

export {
  mockQuestions,
  mockSubjects,
  mockSubTopics,
  mockTopics,
} from './builders'

export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find((s) => s.id === id)
}

export function getTopicsBySubjectId(subjectId: string): Topic[] {
  return mockTopics.filter((t) => t.subjectId === subjectId)
}

export function getTopicById(id: string): Topic | undefined {
  return mockTopics.find((t) => t.id === id)
}

export function getSubTopicsByTopicId(topicId: string): SubTopic[] {
  return mockSubTopics.filter((st) => st.topicId === topicId)
}

export function getSubTopicById(id: string): SubTopic | undefined {
  return mockSubTopics.find((st) => st.id === id)
}

export function getQuestionsByTopicId(topicId: string) {
  return mockQuestions.filter((q) => q.topicId === topicId)
}

export function getQuestionsBySubTopicId(subTopicId: string) {
  return mockQuestions.filter((q) => q.subTopicId === subTopicId)
}

export function getQuestionById(id: string) {
  return mockQuestions.find((q) => q.id === id)
}

export function getContinueSubTopicForSubject(subjectId: string): SubTopic | undefined {
  const topics = getTopicsBySubjectId(subjectId)
  const inProgressTopic = topics.find((t) => t.status === 'started')
  if (inProgressTopic) {
    const subTopic = getSubTopicsByTopicId(inProgressTopic.id).find(
      (st) => st.status === 'started',
    )
    if (subTopic) return subTopic
    return getSubTopicsByTopicId(inProgressTopic.id)[0]
  }

  const firstTopic = topics[0]
  return firstTopic ? getSubTopicsByTopicId(firstTopic.id)[0] : undefined
}

export function countItemsByStatus<T extends { status: StudyStatus }>(
  items: T[],
): Record<StudyStatus, number> {
  return {
    completed: items.filter((item) => item.status === 'completed').length,
    started: items.filter((item) => item.status === 'started').length,
    not_started: items.filter((item) => item.status === 'not_started').length,
  }
}

export function countTopicsByStatus(
  topics: Topic[],
): Record<StudyStatus, number> {
  return countItemsByStatus(topics)
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

export const mockProgress = mockTopics.slice(0, 5).map((topic, index) => {
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
