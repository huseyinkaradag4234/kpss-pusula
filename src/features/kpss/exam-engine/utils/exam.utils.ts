import type {
  ExamAnswerState,
  ExamQuestion,
  ExamSessionResult,
  ExamSubjectAnalysis,
  WrongQuestionRecord,
} from '../types'
import { calculateExamNet } from '../../mock/exams'
import { examEngineStore } from '../store'

export function buildInitialAnswers(
  questions: ExamQuestion[],
): Record<string, ExamAnswerState> {
  return Object.fromEntries(
    questions.map((q) => [q.id, { selectedIndex: null, marked: false }]),
  )
}

export function computeExamResult(
  examId: string,
  examTitle: string,
  questions: ExamQuestion[],
  answers: Record<string, ExamAnswerState>,
  elapsedSeconds: number,
): ExamSessionResult {
  let correctCount = 0
  let wrongCount = 0
  let emptyCount = 0
  const wrongQuestionIds: string[] = []
  const wrongRecords: WrongQuestionRecord[] = []
  const subjectMap = new Map<string, ExamSubjectAnalysis>()

  questions.forEach((question) => {
    const answer = answers[question.id]
    const selected = answer?.selectedIndex ?? null

    let existing = subjectMap.get(question.subjectId)
    if (!existing) {
      existing = {
        subjectId: question.subjectId,
        subjectName: question.subjectName,
        correct: 0,
        wrong: 0,
        empty: 0,
        total: 0,
        successRate: 0,
      }
      subjectMap.set(question.subjectId, existing)
    }

    existing.total++

    if (selected === null) {
      emptyCount++
      existing.empty++
      return
    }

    if (selected === question.correctIndex) {
      correctCount++
      existing.correct++
      return
    }

    wrongCount++
    existing.wrong++
    wrongQuestionIds.push(question.id)
    wrongRecords.push({
      id: `wrong-${question.id}`,
      questionId: question.id,
      examId,
      examTitle,
      subjectId: question.subjectId,
      subjectName: question.subjectName,
      text: question.text,
      options: question.options,
      correctIndex: question.correctIndex,
      selectedIndex: selected,
      explanation: question.explanation,
      answeredAt: new Date().toISOString(),
    })
  })

  const subjectBreakdown = [...subjectMap.values()].map((item) => ({
    ...item,
    successRate:
      item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0,
  }))

  const net = calculateExamNet(correctCount, wrongCount)
  const answered = correctCount + wrongCount
  const successRate = answered > 0 ? Math.round((correctCount / answered) * 100) : 0

  const result: ExamSessionResult = {
    examId,
    examTitle,
    correctCount,
    wrongCount,
    emptyCount,
    net,
    successRate,
    totalDurationSeconds: elapsedSeconds,
    completedAt: new Date().toISOString(),
    subjectBreakdown,
    wrongQuestionIds,
  }

  examEngineStore.saveResult(result, wrongRecords)
  return result
}

export function getStrongestSubject(
  breakdown: ExamSubjectAnalysis[],
): ExamSubjectAnalysis | null {
  if (breakdown.length === 0) return null
  return [...breakdown].sort((a, b) => b.successRate - a.successRate)[0] ?? null
}

export function getWeakestSubject(
  breakdown: ExamSubjectAnalysis[],
): ExamSubjectAnalysis | null {
  if (breakdown.length === 0) return null
  return [...breakdown].sort((a, b) => a.successRate - b.successRate)[0] ?? null
}
