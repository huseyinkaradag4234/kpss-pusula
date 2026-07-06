import { useCallback, useEffect, useRef, useState } from 'react'
import { formatTimerDisplay } from '../../mock/exams'

interface UseExamTimerOptions {
  totalSeconds: number
  onExpire?: () => void
  autoStart?: boolean
}

export function useExamTimer({
  totalSeconds,
  onExpire,
  autoStart = false,
}: UseExamTimerOptions) {
  const [remainingSeconds, setRemainingSeconds] = useState(totalSeconds)
  const [isRunning, setIsRunning] = useState(autoStart)
  const [isPaused, setIsPaused] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const onExpireRef = useRef(onExpire)

  useEffect(() => {
    onExpireRef.current = onExpire
  }, [onExpire])

  useEffect(() => {
    if (!isRunning || isPaused) return

    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onExpireRef.current?.()
          return 0
        }
        return prev - 1
      })
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)

    return () => window.clearInterval(interval)
  }, [isRunning, isPaused])

  const start = useCallback(() => {
    setIsRunning(true)
    setIsPaused(false)
  }, [])

  const pause = useCallback(() => {
    setIsPaused(true)
  }, [])

  const resume = useCallback(() => {
    setIsPaused(false)
    setIsRunning(true)
  }, [])

  const stop = useCallback(() => {
    setIsRunning(false)
    setIsPaused(false)
  }, [])

  const display = formatTimerDisplay(remainingSeconds)
  const isLowTime = remainingSeconds <= 300

  return {
    remainingSeconds,
    elapsedSeconds,
    display,
    isRunning,
    isPaused,
    isLowTime,
    start,
    pause,
    resume,
    stop,
  }
}
