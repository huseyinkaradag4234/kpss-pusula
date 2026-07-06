import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Eraser,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, CardBody } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { getExamQuestions } from '../../mock/data'
import { QUESTION_OPTION_LABELS } from '../../types'
import ExamFinishModal from './ExamFinishModal'
import ExamQuestionPalette from './ExamQuestionPalette'
import ExamTimerBar from './ExamTimerBar'
import { useExamTimer } from '../hooks/useExamTimer'
import { examEngineStore } from '../store'
import type { ExamAnswerState } from '../types'
import { buildInitialAnswers, computeExamResult } from '../utils/exam.utils'

interface ExamPlayerProps {
  examId: string
  examTitle: string
  durationMinutes: number
}

export default function ExamPlayer({
  examId,
  examTitle,
  durationMinutes,
}: ExamPlayerProps) {
  const navigate = useNavigate()
  const questions = useMemo(() => getExamQuestions(examId), [examId])
  const questionIds = useMemo(() => questions.map((q) => q.id), [questions])
  const elapsedRef = useRef(0)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, ExamAnswerState>>(() =>
    buildInitialAnswers(questions),
  )
  const [finishOpen, setFinishOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [expireRequested, setExpireRequested] = useState(false)

  const timer = useExamTimer({
    totalSeconds: durationMinutes * 60,
    onExpire: () => setExpireRequested(true),
    autoStart: true,
  })

  const finishExam = useCallback(() => {
    const result = computeExamResult(
      examId,
      examTitle,
      questions,
      answers,
      elapsedRef.current,
    )
    timer.stop()
    navigate(KPSS_ROUTES.examResult(examId), { state: { result } })
  }, [examId, examTitle, questions, answers, navigate, timer])

  useEffect(() => {
    if (expireRequested) {
      finishExam()
    }
  }, [expireRequested, finishExam])

  useEffect(() => {
    elapsedRef.current = timer.elapsedSeconds
  }, [timer.elapsedSeconds])

  useEffect(() => {
    examEngineStore.markExamStarted(examId)
  }, [examId])

  const currentQuestion = questions[currentIndex]
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined
  const progress = questions.length
    ? Math.round(((currentIndex + 1) / questions.length) * 100)
    : 0

  const stats = useMemo(() => {
    const values = Object.values(answers)
    return {
      answered: values.filter((a) => a.selectedIndex !== null).length,
      empty: values.filter((a) => a.selectedIndex === null).length,
      marked: values.filter((a) => a.marked).length,
    }
  }, [answers])

  const updateAnswer = useCallback(
    (questionId: string, patch: Partial<ExamAnswerState>) => {
      setAnswers((prev) => ({
        ...prev,
        [questionId]: { ...prev[questionId]!, ...patch },
      }))
    },
    [],
  )

  const handleSelect = (index: number) => {
    if (!currentQuestion) return
    updateAnswer(currentQuestion.id, { selectedIndex: index })
  }

  const handleClear = () => {
    if (!currentQuestion) return
    updateAnswer(currentQuestion.id, { selectedIndex: null })
  }

  const handleMark = () => {
    if (!currentQuestion) return
    const current = answers[currentQuestion.id]
    updateAnswer(currentQuestion.id, { marked: !current?.marked })
  }

  const goToQuestion = (index: number) => {
    setCurrentIndex(index)
    setPaletteOpen(false)
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="exam-player">
      <header className="exam-player__toolbar">
        <ExamTimerBar
          display={timer.display}
          isRunning={timer.isRunning}
          isPaused={timer.isPaused}
          isLowTime={timer.isLowTime}
          onStart={timer.start}
          onPause={timer.pause}
          onResume={timer.resume}
          onStop={() => setFinishOpen(true)}
        />
        <div className="exam-player__meta">
          <span className="exam-player__counter">
            Soru {currentIndex + 1} / {questions.length}
          </span>
          <Badge variant="secondary">{currentQuestion.subjectName}</Badge>
        </div>
        <div
          className="exam-player__progress"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
      </header>

      <div className="exam-player__layout">
        <main className="exam-player__main">
          <Card className="exam-player__card">
            <CardBody>
              <p className="exam-player__question-text">{currentQuestion.text}</p>
              <div className="exam-player__options" role="radiogroup" aria-label="Cevap seçenekleri">
                {currentQuestion.options.map((option, index) => {
                  const label = QUESTION_OPTION_LABELS[index]
                  const isSelected = currentAnswer?.selectedIndex === index
                  return (
                    <button
                      key={label}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      className={`exam-option${isSelected ? ' exam-option--selected' : ''}`}
                      onClick={() => handleSelect(index)}
                    >
                      <span className="exam-option__label">{label}</span>
                      <span className="exam-option__text">{option}</span>
                    </button>
                  )
                })}
              </div>

              <div className="exam-player__actions">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Eraser size={16} />}
                  onClick={handleClear}
                >
                  Boş Bırak
                </Button>
                <Button
                  variant={currentAnswer?.marked ? 'secondary' : 'outline'}
                  size="sm"
                  leftIcon={<Bookmark size={16} />}
                  onClick={handleMark}
                >
                  {currentAnswer?.marked ? 'İşaretli' : 'İşaretle'}
                </Button>
              </div>
            </CardBody>
          </Card>

          <nav className="exam-player__nav">
            <Button
              variant="outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => i - 1)}
              leftIcon={<ChevronLeft size={16} />}
            >
              Önceki
            </Button>
            <Button
              variant="outline"
              className="exam-player__palette-toggle"
              onClick={() => setPaletteOpen((o) => !o)}
            >
              Palet
            </Button>
            {currentIndex < questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setCurrentIndex((i) => i + 1)}
                rightIcon={<ChevronRight size={16} />}
              >
                Sonraki
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setFinishOpen(true)}>
                Sınavı Bitir
              </Button>
            )}
          </nav>
        </main>

        <aside className={`exam-player__palette${paletteOpen ? ' exam-player__palette--open' : ''}`}>
          <ExamQuestionPalette
            total={questions.length}
            currentIndex={currentIndex}
            answers={answers}
            questionIds={questionIds}
            onSelect={goToQuestion}
          />
        </aside>
      </div>

      <ExamFinishModal
        open={finishOpen}
        answeredCount={stats.answered}
        emptyCount={stats.empty}
        markedCount={stats.marked}
        onConfirm={finishExam}
        onCancel={() => setFinishOpen(false)}
      />
    </div>
  )
}
