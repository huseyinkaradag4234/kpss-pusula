import { Pause, Play, Square } from 'lucide-react'
import { Button } from '../../../../components/ui'

interface ExamTimerBarProps {
  display: string
  isRunning: boolean
  isPaused: boolean
  isLowTime: boolean
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onStop: () => void
  showControls?: boolean
}

export default function ExamTimerBar({
  display,
  isRunning,
  isPaused,
  isLowTime,
  onStart,
  onPause,
  onResume,
  onStop,
  showControls = true,
}: ExamTimerBarProps) {
  return (
    <div className={`exam-timer${isLowTime ? ' exam-timer--low' : ''}`}>
      <div className="exam-timer__display" aria-live="polite" aria-label="Kalan süre">
        {display}
      </div>
      {showControls ? (
        <div className="exam-timer__controls">
          {!isRunning && !isPaused ? (
            <Button variant="outline" size="sm" onClick={onStart} leftIcon={<Play size={14} />}>
              Başlat
            </Button>
          ) : null}
          {isRunning && !isPaused ? (
            <Button variant="outline" size="sm" onClick={onPause} leftIcon={<Pause size={14} />}>
              Duraklat
            </Button>
          ) : null}
          {isPaused ? (
            <Button variant="outline" size="sm" onClick={onResume} leftIcon={<Play size={14} />}>
              Devam
            </Button>
          ) : null}
          {(isRunning || isPaused) ? (
            <Button variant="ghost" size="sm" onClick={onStop} leftIcon={<Square size={14} />}>
              Bitir
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
