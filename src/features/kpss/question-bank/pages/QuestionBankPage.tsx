import { RotateCcw } from 'lucide-react'
import { useState, useSyncExternalStore } from 'react'
import { Badge, Button, Card, CardBody, EmptyState } from '../../../../components/ui'
import { QUESTION_OPTION_LABELS } from '../../types'
import { examEngineStore } from '../../exam-engine/store'
import type { WrongQuestionRecord } from '../../exam-engine/types'
import { getWrongQuestions } from '../../mock/data'

export default function QuestionBankPage() {
  useSyncExternalStore(examEngineStore.subscribe, examEngineStore.getSnapshot)
  const [retryId, setRetryId] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showAnswer, setShowAnswer] = useState(false)

  const wrongQuestions = getWrongQuestions()

  const retryQuestion = wrongQuestions.find((q) => q.id === retryId)

  const handleRetry = (question: WrongQuestionRecord) => {
    setRetryId(question.id)
    setSelectedIndex(null)
    setShowAnswer(false)
  }

  const handleCheck = () => {
    setShowAnswer(true)
  }

  const handleDismiss = (questionId: string) => {
    examEngineStore.removeWrongQuestion(questionId)
    setRetryId(null)
    setShowAnswer(false)
  }

  if (retryQuestion) {
    const isCorrect = selectedIndex === retryQuestion.correctIndex
    return (
      <div className="wrong-review">
        <header className="wrong-review__header">
          <Button variant="outline" size="sm" onClick={() => setRetryId(null)}>
            Listeye Dön
          </Button>
          <Badge variant="secondary">{retryQuestion.subjectName}</Badge>
        </header>

        <Card>
          <CardBody>
            <p className="text-caption">{retryQuestion.examTitle}</p>
            <p className="wrong-review__text">{retryQuestion.text}</p>
            <div className="exam-player__options">
              {retryQuestion.options.map((option, index) => {
                const label = QUESTION_OPTION_LABELS[index]
                let className = 'exam-option'
                if (selectedIndex === index) className += ' exam-option--selected'
                if (showAnswer && index === retryQuestion.correctIndex) {
                  className += ' exam-option--correct'
                }
                if (showAnswer && selectedIndex === index && !isCorrect) {
                  className += ' exam-option--wrong'
                }
                return (
                  <button
                    key={label}
                    type="button"
                    className={className}
                    disabled={showAnswer}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <span className="exam-option__label">{label}</span>
                    <span className="exam-option__text">{option}</span>
                  </button>
                )
              })}
            </div>

            {showAnswer ? (
              <div className="wrong-review__feedback">
                <p className={isCorrect ? 'text-success' : 'text-danger'}>
                  {isCorrect ? 'Doğru cevap!' : 'Yanlış cevap.'}
                </p>
                <p className="text-caption">{retryQuestion.explanation}</p>
              </div>
            ) : null}

            <div className="wrong-review__actions">
              {!showAnswer ? (
                <Button variant="primary" disabled={selectedIndex === null} onClick={handleCheck}>
                  Kontrol Et
                </Button>
              ) : (
                <Button
                  variant="outline"
                  leftIcon={<RotateCcw size={16} />}
                  onClick={() => handleDismiss(retryQuestion.questionId)}
                >
                  Anladım, Kaldır
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    )
  }

  return (
    <div className="wrong-questions-page">
      <header className="wrong-questions-page__header">
        <h1 className="text-heading">Yanlışlarım</h1>
        <p className="text-caption">
          Deneme sınavlarında yanlış cevapladığınız soruları tekrar çözün.
        </p>
      </header>

      {wrongQuestions.length > 0 ? (
        <div className="wrong-questions-page__list">
          {wrongQuestions.map((question) => (
            <Card key={question.id} className="wrong-question-card">
              <CardBody>
                <div className="wrong-question-card__header">
                  <Badge variant="secondary">{question.subjectName}</Badge>
                  <span className="text-caption">{question.examTitle}</span>
                </div>
                <p className="wrong-question-card__text">{question.text}</p>
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<RotateCcw size={16} />}
                  onClick={() => handleRetry(question)}
                >
                  Tekrar Çöz
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Yanlış soru yok"
          description="Henüz yanlış cevaplanan soru bulunmuyor. Bir deneme sınavı çözerek başlayın."
        />
      )}
    </div>
  )
}
