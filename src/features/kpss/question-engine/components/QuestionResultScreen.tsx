import { RotateCcw, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'

interface QuestionResultScreenProps {
  correctCount: number
  wrongCount: number
  successRate: number
  totalDurationSeconds: number
  topicId: string
  onRetry: () => void
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins} dk ${secs} sn` : `${secs} sn`
}

export default function QuestionResultScreen({
  correctCount,
  wrongCount,
  successRate,
  totalDurationSeconds,
  topicId,
  onRetry,
}: QuestionResultScreenProps) {
  return (
    <div className="question-result animate-fade-in-up">
      <Card className="question-result__card">
        <CardBody>
          <div className="question-result__icon" aria-hidden="true">
            <Trophy size={32} />
          </div>
          <h2 className="text-heading">Konu Tamamlandı!</h2>
          <p className="text-caption">Harika iş çıkardınız. İşte sonuçlarınız:</p>

          <dl className="question-result__stats">
            <div className="question-result__stat question-result__stat--correct">
              <dt>Doğru</dt>
              <dd>{correctCount}</dd>
            </div>
            <div className="question-result__stat question-result__stat--wrong">
              <dt>Yanlış</dt>
              <dd>{wrongCount}</dd>
            </div>
            <div className="question-result__stat question-result__stat--rate">
              <dt>Başarı</dt>
              <dd>%{successRate}</dd>
            </div>
            <div className="question-result__stat">
              <dt>Süre</dt>
              <dd>{formatDuration(totalDurationSeconds)}</dd>
            </div>
          </dl>

          <div className="question-result__actions">
            <Button
              variant="primary"
              leftIcon={<RotateCcw size={18} aria-hidden="true" />}
              onClick={onRetry}
            >
              Tekrar Çöz
            </Button>
            <Link to={KPSS_ROUTES.topicDetail(topicId)}>
              <Button variant="outline">Konuya Dön</Button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
