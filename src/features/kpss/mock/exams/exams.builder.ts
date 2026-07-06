import type { ExamQuestion } from '../../exam-engine/types'
import type { Question } from '../../types'
import { mockQuestions, mockSubjects } from '../builders'
import { EXAM_DEFINITIONS } from './exams.data'

const questionCache = new Map<string, ExamQuestion[]>()

function getSubjectName(subjectId: string): string {
  return mockSubjects.find((s) => s.id === subjectId)?.name ?? subjectId
}

function pickQuestionsForExam(
  subjectIds: string[],
  count: number,
): Question[] {
  const pools = subjectIds.map((id) =>
    mockQuestions.filter((q) => q.subjectId === id),
  )
  const picked: Question[] = []
  let poolIndex = 0

  while (picked.length < count) {
    const pool = pools[poolIndex % pools.length]
    if (!pool || pool.length === 0) break

    const question = pool[picked.length % pool.length]
    if (question && !picked.some((q) => q.id === question.id)) {
      picked.push(question)
    } else if (pool[picked.length % pool.length]) {
      picked.push({
        ...pool[picked.length % pool.length]!,
        id: `${pool[picked.length % pool.length]!.id}-exam-${picked.length}`,
      })
    }

    poolIndex++
    if (poolIndex > count * subjectIds.length * 2) break
  }

  return picked.slice(0, count)
}

function buildExamQuestions(examId: string): ExamQuestion[] {
  const cached = questionCache.get(examId)
  if (cached) return cached

  const exam = EXAM_DEFINITIONS.find((e) => e.id === examId)
  if (!exam) return []

  const sourceQuestions = pickQuestionsForExam(exam.subjectIds, exam.questionCount)

  const questions: ExamQuestion[] = sourceQuestions.map((q, index) => ({
    id: `${examId}-q${index + 1}`,
    examId,
    number: index + 1,
    subjectId: q.subjectId,
    subjectName: getSubjectName(q.subjectId),
    text: q.text,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
  }))

  questionCache.set(examId, questions)
  return questions
}

export function getExamQuestions(examId: string): ExamQuestion[] {
  return buildExamQuestions(examId)
}

export function getExamQuestionById(
  examId: string,
  questionId: string,
): ExamQuestion | undefined {
  return getExamQuestions(examId).find((q) => q.id === questionId)
}
