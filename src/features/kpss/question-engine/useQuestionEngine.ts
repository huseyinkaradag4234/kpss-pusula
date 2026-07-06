import { useCallback, useSyncExternalStore } from 'react'
import type { QuestionSessionResult } from '../types'
import { questionEngineStore } from './store'

export function useQuestionEngine() {
  const state = useSyncExternalStore(
    questionEngineStore.subscribe,
    questionEngineStore.getSnapshot,
    questionEngineStore.getSnapshot,
  )

  const recordAnswer = useCallback((isCorrect: boolean) => {
    questionEngineStore.recordAnswer(isCorrect)
  }, [])

  const toggleFavorite = useCallback((questionId: string) => {
    return questionEngineStore.toggleFavorite(questionId)
  }, [])

  const isFavorite = useCallback((questionId: string) => {
    return questionEngineStore.isFavorite(questionId)
  }, [])

  const setSessionResult = useCallback((result: QuestionSessionResult) => {
    questionEngineStore.setSessionResult(result)
  }, [])

  return {
    todaySolved: state.todaySolved,
    todayCorrect: state.todayCorrect,
    todayWrong: state.todayWrong,
    successRate: questionEngineStore.getSuccessRate(),
    favoriteQuestionIds: state.favoriteQuestionIds,
    lastSessionResult: state.lastSessionResult,
    recordAnswer,
    toggleFavorite,
    isFavorite,
    setSessionResult,
  }
}
