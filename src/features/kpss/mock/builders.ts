import type { Question, StudyStatus, Subject, SubTopic, Topic } from '../types'
import { SUBJECT_CURRICULUM } from './curriculum/subjects'
import { getSubTopicsForTopic } from './curriculum/subtopics'
import { QUESTION_TEMPLATES } from './questions.templates'

const SOLVED_SEEDS = [
  12, 8, 20, 5, 15, 3, 10, 7, 18, 4, 9, 11, 6, 14, 2, 13, 8, 5, 16, 1, 19, 0,
]
const CORRECT_RATE_SEEDS = [
  72, 85, 60, 90, 68, 78, 55, 82, 74, 88, 65, 70, 80, 58, 92, 76, 63, 86, 71, 84,
]

const QUESTIONS_PER_SUBTOPIC = 5
const MINUTES_PER_QUESTION = 1.5

export function resolveStudyStatus(progress: number, solvedCount: number): StudyStatus {
  if (progress >= 80) return 'completed'
  if (solvedCount > 0) return 'started'
  return 'not_started'
}

function seedValue(seeds: number[], index: number): number {
  return seeds[index % seeds.length] ?? 0
}

function buildSubTopics(): SubTopic[] {
  let globalIndex = 0

  return SUBJECT_CURRICULUM.flatMap((subject) =>
    subject.topics.flatMap((topic) => {
      const topicId = `topic-${subject.id}-${topic.slug}`
      const subTopicDefs = getSubTopicsForTopic(topic.name, topic.slug)

      return subTopicDefs.map((subTopicDef, subIndex) => {
        const solved = seedValue(SOLVED_SEEDS, globalIndex + subIndex)
        globalIndex++

        const total = QUESTIONS_PER_SUBTOPIC
        const progress = Math.round((solved / total) * 100)

        return {
          id: `subtopic-${subject.id}-${topic.slug}-${subTopicDef.slug}`,
          topicId,
          subjectId: subject.id,
          name: subTopicDef.name,
          slug: subTopicDef.slug,
          description: `${topic.name} — ${subTopicDef.name}`,
          questionCount: total,
          solvedCount: solved,
          progress,
          status: resolveStudyStatus(progress, solved),
          estimatedStudyMinutes: Math.round(total * MINUTES_PER_QUESTION),
        }
      })
    }),
  )
}

function buildTopics(subTopics: SubTopic[]): Topic[] {
  return SUBJECT_CURRICULUM.flatMap((subject) =>
    subject.topics.map((topic, topicIndex) => {
      const topicId = `topic-${subject.id}-${topic.slug}`
      const topicSubTopics = subTopics.filter((st) => st.topicId === topicId)
      const totalQuestions = topicSubTopics.reduce((sum, st) => sum + st.questionCount, 0)
      const solvedQuestions = topicSubTopics.reduce((sum, st) => sum + st.solvedCount, 0)
      const progress =
        totalQuestions > 0 ? Math.round((solvedQuestions / totalQuestions) * 100) : 0
      const correctRate = seedValue(CORRECT_RATE_SEEDS, topicIndex)

      return {
        id: topicId,
        subjectId: subject.id,
        name: topic.name,
        slug: topic.slug,
        description: `${subject.name} — ${topic.name} konusu`,
        difficulty: topic.difficulty,
        questionCount: totalQuestions,
        solvedCount: solvedQuestions,
        correctRate,
        completedCount: solvedQuestions,
        progress,
        subTopicCount: topicSubTopics.length,
        status: resolveStudyStatus(progress, solvedQuestions),
        estimatedStudyMinutes: topicSubTopics.reduce(
          (sum, st) => sum + st.estimatedStudyMinutes,
          0,
        ),
      }
    }),
  )
}

function buildSubjects(topics: Topic[]): Subject[] {
  const now = Date.now()

  return SUBJECT_CURRICULUM.map((subject, index) => {
    const subjectTopics = topics.filter((t) => t.subjectId === subject.id)
    const completedTopics = subjectTopics.filter((t) => t.status === 'completed').length
    const startedTopics = subjectTopics.filter((t) => t.status === 'started').length
    const notStartedTopics = subjectTopics.filter((t) => t.status === 'not_started').length
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
      estimatedStudyMinutes: subjectTopics.reduce(
        (sum, t) => sum + t.estimatedStudyMinutes,
        0,
      ),
      startedTopicCount: startedTopics,
      notStartedTopicCount: notStartedTopics,
    }
  })
}

function buildQuestions(subTopics: SubTopic[]): Question[] {
  return subTopics.flatMap((subTopic) => {
    const topic = SUBJECT_CURRICULUM.flatMap((s) =>
      s.topics.map((t) => ({ subject: s, topic: t })),
    ).find(
      ({ subject, topic }) =>
        `topic-${subject.id}-${topic.slug}` === subTopic.topicId,
    )

    const topicName = topic?.topic.name ?? subTopic.name

    return QUESTION_TEMPLATES.map((template, index) => ({
      id: `${subTopic.id}-q${index + 1}`,
      topicId: subTopic.topicId,
      subjectId: subTopic.subjectId,
      subTopicId: subTopic.id,
      title: `${template.title} ${index + 1}`,
      text: `${subTopic.name}: ${template.text}`,
      options: template.options,
      correctIndex: index % 4,
      difficulty: topic?.topic.difficulty ?? 'medium',
      explanation: `${template.explanation} (${topicName} — ${subTopic.name})`,
    }))
  })
}

export const mockSubTopics = buildSubTopics()
export const mockTopics = buildTopics(mockSubTopics)
export const mockSubjects = buildSubjects(mockTopics)
export const mockQuestions = buildQuestions(mockSubTopics)
