import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Heart,
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Badge, Button, Card, CardBody, useToast } from '../../../../components/ui'
import { getSubTopicById, getTopicById, getQuestionsBySubTopicId, getQuestionsByTopicId } from '../../mock/data'
import { useQuestionEngine } from '../../question-engine/useQuestionEngine'
import type { Question } from '../../types'
import { QUESTION_OPTION_LABELS } from '../../types'
import {
  getDifficultyLabel,
  getDifficultyVariant,
} from '../../utils/subject.utils'
import QuestionResultScreen from './QuestionResultScreen'

interface QuestionPlayerProps {
  topicId: string
  subTopicId?: string
}

type AnswerState = 'idle' | 'correct' | 'wrong'

export default function QuestionPlayer({ topicId, subTopicId }: QuestionPlayerProps) {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const { recordAnswer, toggleFavorite, setSessionResult, favoriteQuestionIds } =
    useQuestionEngine()

  const topic = getTopicById(topicId)
  const subTopic = subTopicId ? getSubTopicById(subTopicId) : undefined
  const questions = useMemo(
    () =>
      subTopicId
        ? getQuestionsBySubTopicId(subTopicId)
        : getQuestionsByTopicId(topicId),
    [topicId, subTopicId],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [startedAt] = useState(Date.now())
  const [isComplete, setIsComplete] = useState(false)
  const [favorite, setFavorite] = useState(false)

  const currentQuestion: Question | undefined = questions[currentIndex]
  const progress = questions.length
    ? Math.round(((currentIndex + (answerState !== 'idle' ? 1 : 0)) / questions.length) * 100)
    : 0

  useEffect(() => {
    if (currentQuestion) {
      setFavorite(favoriteQuestionIds.has(currentQuestion.id))
    }
  }, [currentQuestion, favoriteQuestionIds])

  const handleSelect = useCallback(
    (index: number) => {
      if (!currentQuestion || answerState !== 'idle') return

      const isCorrect = index === currentQuestion.correctIndex
      setSelectedIndex(index)
      setAnswerState(isCorrect ? 'correct' : 'wrong')
      recordAnswer(isCorrect)
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: isCorrect }))
    },
    [currentQuestion, answerState, recordAnswer],
  )

  const goNext = useCallback(() => {
    if (currentIndex >= questions.length - 1) {
      const correctCount = Object.values(answers).filter(Boolean).length
      const wrongCount = Object.keys(answers).length - correctCount
      const total = questions.length
      const successRate = total > 0 ? Math.round((correctCount / total) * 100) : 0

      setSessionResult({
        topicId,
        correctCount,
        wrongCount,
        successRate,
        totalDurationSeconds: Math.round((Date.now() - startedAt) / 1000),
        completedAt: new Date().toISOString(),
      })
      setIsComplete(true)
      return
    }

    setCurrentIndex((i) => i + 1)
    setSelectedIndex(null)
    setAnswerState('idle')
  }, [answers, currentIndex, questions.length, setSessionResult, startedAt, topicId])

  const goPrev = useCallback(() => {
    if (currentIndex === 0) return
    setCurrentIndex((i) => i - 1)
    setSelectedIndex(null)
    setAnswerState('idle')
  }, [currentIndex])

  const handleFavorite = useCallback(() => {
    if (!currentQuestion) return
    const next = toggleFavorite(currentQuestion.id)
    setFavorite(next)
    showToast({
      title: next ? 'Favorilere eklendi' : 'Favorilerden çıkarıldı',
      variant: 'success',
    })
  }, [currentQuestion, toggleFavorite, showToast])

  const handleReport = useCallback(() => {
    showToast({
      title: 'Bildiriminiz alındı',
      description: 'Soru incelemeye alındı. Teşekkürler!',
      variant: 'info',
    })
  }, [showToast])

  const handleRetry = useCallback(() => {
    setCurrentIndex(0)
    setSelectedIndex(null)
    setAnswerState('idle')
    setAnswers({})
    setIsComplete(false)
  }, [])

  if (!topic || questions.length === 0) {
    return (
      <Card>
        <CardBody>
          <p>Bu konu için soru bulunamadı.</p>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Geri Dön
          </Button>
        </CardBody>
      </Card>
    )
  }

  if (isComplete) {
    const correctCount = Object.values(answers).filter(Boolean).length
    const wrongCount = Object.keys(answers).length - correctCount
    const successRate =
      questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0

    return (
      <QuestionResultScreen
        correctCount={correctCount}
        wrongCount={wrongCount}
        successRate={successRate}
        totalDurationSeconds={Math.round((Date.now() - startedAt) / 1000)}
        onRetry={handleRetry}
        topicId={topicId}
      />
    )
  }

  if (!currentQuestion) {
    return null
  }

  return (
    <div className="question-player">
      <header className="question-player__header">
        <div>
          <Badge variant={getDifficultyVariant(topic.difficulty)}>
            {getDifficultyLabel(topic.difficulty)}
          </Badge>
          <h1 className="question-player__topic">
            {subTopic ? subTopic.name : topic.name}
          </h1>
          {subTopic ? (
            <p className="text-caption question-player__subtitle">{topic.name}</p>
          ) : null}
        </div>
        <div className="question-player__meta">
          <span className="question-player__counter" aria-live="polite">
            Soru {currentIndex + 1} / {questions.length}
          </span>
        </div>
      </header>

      <div
        className="question-player__progress"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Konu ilerlemesi"
      >
        <span className="question-player__progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <Card
        className={`question-player__card question-player__card--${answerState}`}
      >
        <CardBody>
          <p className="question-player__title">{currentQuestion.title}</p>
          <p className="question-player__text">{currentQuestion.text}</p>

          <div className="question-player__options" role="listbox" aria-label="Cevap seçenekleri">
            {currentQuestion.options.map((option, index) => {
              const label = QUESTION_OPTION_LABELS[index]
              const isSelected = selectedIndex === index
              const isCorrectOption = index === currentQuestion.correctIndex
              let optionClass = 'question-option'

              if (answerState !== 'idle') {
                if (isCorrectOption) optionClass += ' question-option--correct'
                else if (isSelected) optionClass += ' question-option--wrong'
              } else if (isSelected) {
                optionClass += ' question-option--selected'
              }

              return (
                <button
                  key={label}
                  type="button"
                  className={`${optionClass} interactive`}
                  onClick={() => handleSelect(index)}
                  disabled={answerState !== 'idle'}
                  role="option"
                  aria-selected={isSelected}
                >
                  <span className="question-option__label" aria-hidden="true">
                    {label}
                  </span>
                  <span className="question-option__text">{option}</span>
                </button>
              )
            })}
          </div>

          {answerState !== 'idle' ? (
            <div className="question-player__feedback" role="status" aria-live="polite">
              <p className={`question-player__result question-player__result--${answerState}`}>
                {answerState === 'correct' ? 'Doğru cevap!' : 'Yanlış cevap'}
              </p>
              {answerState === 'wrong' ? (
                <p className="question-player__correct-answer">
                  Doğru cevap:{' '}
                  <strong>
                    {QUESTION_OPTION_LABELS[currentQuestion.correctIndex]}
                  </strong>
                </p>
              ) : null}
            </div>
          ) : null}

          <section className="question-player__explanation" aria-labelledby="explanation-title">
            <h2 id="explanation-title" className="question-player__explanation-title">
              Açıklama
            </h2>
            <p>{currentQuestion.explanation}</p>
          </section>

          <div className="question-player__actions">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Heart size={16} fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />}
              onClick={handleFavorite}
              aria-pressed={favorite}
            >
              Favori
            </Button>
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<Flag size={16} aria-hidden="true" />}
              onClick={handleReport}
            >
              Bildir
            </Button>
          </div>
        </CardBody>
      </Card>

      <nav className="question-player__nav" aria-label="Soru navigasyonu">
        <Button
          variant="outline"
          leftIcon={<ChevronLeft size={18} aria-hidden="true" />}
          onClick={goPrev}
          disabled={currentIndex === 0}
        >
          Önceki
        </Button>

        <Button
          variant="primary"
          rightIcon={<ChevronRight size={18} aria-hidden="true" />}
          onClick={goNext}
          disabled={answerState === 'idle'}
        >
          {currentIndex >= questions.length - 1 ? 'Bitir' : 'Sonraki'}
        </Button>
      </nav>
    </div>
  )
}
