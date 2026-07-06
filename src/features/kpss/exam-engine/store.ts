import type {
  ExamSessionResult,
  WrongQuestionRecord,
} from '../exam-engine/types'

type Listener = () => void

interface ExamCompletion {
  startedAt?: string
  completedAt?: string
  lastScore?: number
}

interface ExamEngineState {
  completions: Record<string, ExamCompletion>
  lastResults: Record<string, ExamSessionResult>
  wrongQuestions: WrongQuestionRecord[]
}

const STORAGE_KEY = 'kpss-exam-engine-v1'

function loadState(): ExamEngineState {
  const defaultState: ExamEngineState = {
    completions: {},
    lastResults: {},
    wrongQuestions: [],
  }

  if (typeof window === 'undefined') return defaultState

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return JSON.parse(raw) as ExamEngineState
  } catch {
    return defaultState
  }
}

let state = loadState()
const listeners = new Set<Listener>()

function persist(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function notify(): void {
  listeners.forEach((listener) => listener())
}

export const examEngineStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  getSnapshot(): ExamEngineState {
    return state
  },

  getCompletions(): Record<string, ExamCompletion> {
    return state.completions
  },

  markExamStarted(examId: string): void {
    const existing = state.completions[examId]
    if (existing?.completedAt) return

    state = {
      ...state,
      completions: {
        ...state.completions,
        [examId]: {
          ...existing,
          startedAt: existing?.startedAt ?? new Date().toISOString(),
        },
      },
    }
    persist()
    notify()
  },

  saveResult(result: ExamSessionResult, wrongRecords: WrongQuestionRecord[]): void {
    const existingWrongIds = new Set(state.wrongQuestions.map((w) => w.questionId))
    const mergedWrong = [
      ...state.wrongQuestions.filter((w) => w.examId !== result.examId),
      ...wrongRecords.filter((w) => !existingWrongIds.has(w.questionId) || true),
    ]

    // Deduplicate by questionId, keep latest
    const wrongMap = new Map<string, WrongQuestionRecord>()
    mergedWrong.forEach((w) => wrongMap.set(w.questionId, w))

    state = {
      ...state,
      completions: {
        ...state.completions,
        [result.examId]: {
          startedAt: state.completions[result.examId]?.startedAt,
          completedAt: result.completedAt,
          lastScore: result.successRate,
        },
      },
      lastResults: {
        ...state.lastResults,
        [result.examId]: result,
      },
      wrongQuestions: [...wrongMap.values()],
    }
    persist()
    notify()
  },

  getLastResult(examId: string): ExamSessionResult | null {
    return state.lastResults[examId] ?? null
  },

  getAllResults(): ExamSessionResult[] {
    return Object.values(state.lastResults)
  },

  getWrongQuestions(): WrongQuestionRecord[] {
    return state.wrongQuestions
  },

  removeWrongQuestion(questionId: string): void {
    state = {
      ...state,
      wrongQuestions: state.wrongQuestions.filter((w) => w.questionId !== questionId),
    }
    persist()
    notify()
  },
}
