import type { QuestionSessionResult } from '../types'

type Listener = () => void

interface QuestionEngineState {
  todaySolved: number
  todayCorrect: number
  todayWrong: number
  favoriteQuestionIds: Set<string>
  lastSessionResult: QuestionSessionResult | null
}

const STORAGE_KEY = 'kpss-question-engine-v1'

function getTodayKey(): string {
  return new Date().toISOString().split('T')[0] ?? ''
}

function loadState(): QuestionEngineState {
  const defaultState: QuestionEngineState = {
    todaySolved: 0,
    todayCorrect: 0,
    todayWrong: 0,
    favoriteQuestionIds: new Set(),
    lastSessionResult: null,
  }

  if (typeof window === 'undefined') {
    return defaultState
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState

    const parsed = JSON.parse(raw) as {
      date: string
      todaySolved: number
      todayCorrect: number
      todayWrong: number
      favoriteQuestionIds: string[]
      lastSessionResult: QuestionSessionResult | null
    }

    if (parsed.date !== getTodayKey()) {
      return {
        ...defaultState,
        favoriteQuestionIds: new Set(parsed.favoriteQuestionIds),
      }
    }

    return {
      todaySolved: parsed.todaySolved,
      todayCorrect: parsed.todayCorrect,
      todayWrong: parsed.todayWrong,
      favoriteQuestionIds: new Set(parsed.favoriteQuestionIds),
      lastSessionResult: parsed.lastSessionResult,
    }
  } catch {
    return defaultState
  }
}

let state = loadState()
const listeners = new Set<Listener>()

function persist(): void {
  if (typeof window === 'undefined') return

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      date: getTodayKey(),
      todaySolved: state.todaySolved,
      todayCorrect: state.todayCorrect,
      todayWrong: state.todayWrong,
      favoriteQuestionIds: [...state.favoriteQuestionIds],
      lastSessionResult: state.lastSessionResult,
    }),
  )
}

function notify(): void {
  listeners.forEach((listener) => listener())
}

export const questionEngineStore = {
  subscribe(listener: Listener): () => void {
    listeners.add(listener)
    return () => listeners.delete(listener)
  },

  getSnapshot() {
    return state
  },

  recordAnswer(isCorrect: boolean): void {
    state = {
      ...state,
      todaySolved: state.todaySolved + 1,
      todayCorrect: state.todayCorrect + (isCorrect ? 1 : 0),
      todayWrong: state.todayWrong + (isCorrect ? 0 : 1),
    }
    persist()
    notify()
  },

  toggleFavorite(questionId: string): boolean {
    const next = new Set(state.favoriteQuestionIds)
    if (next.has(questionId)) {
      next.delete(questionId)
    } else {
      next.add(questionId)
    }
    state = { ...state, favoriteQuestionIds: next }
    persist()
    notify()
    return next.has(questionId)
  },

  isFavorite(questionId: string): boolean {
    return state.favoriteQuestionIds.has(questionId)
  },

  setSessionResult(result: QuestionSessionResult): void {
    state = { ...state, lastSessionResult: result }
    persist()
    notify()
  },

  getSuccessRate(): number {
    const total = state.todayCorrect + state.todayWrong
    if (total === 0) return 0
    return Math.round((state.todayCorrect / total) * 100)
  },
}
