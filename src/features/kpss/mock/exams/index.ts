import type {
  ExamListItem,
  ExamSessionResult,
  WrongQuestionRecord,
} from '../../exam-engine/types'
import { examEngineStore } from '../../exam-engine/store'
import type { StudyStatus } from '../../types'
import { EXAM_DEFINITIONS } from './exams.data'

export { getExamQuestions, getExamQuestionById } from './exams.builder'
export { EXAM_DEFINITIONS } from './exams.data'

export function getExamsList(): ExamListItem[] {
  const completions = examEngineStore.getCompletions()

  return EXAM_DEFINITIONS.map((exam) => {
    const completion = completions[exam.id]
    let status: StudyStatus = 'not_started'
    if (completion?.completedAt) {
      status = 'completed'
    } else if (completion?.startedAt) {
      status = 'started'
    }

    return {
      ...exam,
      status,
      lastScore: completion?.lastScore,
      lastCompletedAt: completion?.completedAt,
    }
  })
}

export function getExamDefinitionById(id: string) {
  return EXAM_DEFINITIONS.find((e) => e.id === id)
}

export function calculateExamNet(correct: number, wrong: number): number {
  return Math.round((correct - wrong / 4) * 100) / 100
}

export function formatExamDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins >= 60) {
    const hours = Math.floor(mins / 60)
    const remainingMins = mins % 60
    return `${hours} sa ${remainingMins} dk`
  }
  return mins > 0 ? `${mins} dk ${secs} sn` : `${secs} sn`
}

export function formatTimerDisplay(totalSeconds: number): string {
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

// Legacy compatibility
export const mockExams = EXAM_DEFINITIONS.map((exam) => ({
  id: exam.id,
  title: exam.title,
  description: exam.description,
  subjectId: exam.subjectIds[0],
  questionCount: exam.questionCount,
  durationMinutes: exam.durationMinutes,
  type: exam.type,
}))

export function getExamById(id: string) {
  return mockExams.find((e) => e.id === id)
}

export const mockExamResults = examEngineStore.getAllResults().map((result, index) => ({
  id: `result-${index + 1}`,
  examId: result.examId,
  examTitle: result.examTitle,
  score: result.successRate,
  correctCount: result.correctCount,
  wrongCount: result.wrongCount,
  emptyCount: result.emptyCount,
  completedAt: result.completedAt,
}))

export function getWrongQuestions(): WrongQuestionRecord[] {
  return examEngineStore.getWrongQuestions()
}

export function getLastExamResult(examId: string): ExamSessionResult | null {
  return examEngineStore.getLastResult(examId)
}
