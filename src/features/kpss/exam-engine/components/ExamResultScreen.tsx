import { RotateCcw, Trophy } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button, Card, CardBody } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { formatExamDuration } from '../../mock/exams'
import type { ExamSessionResult } from '../types'
import ExamAnalysisCards from './ExamAnalysisCards'

interface ExamResultScreenProps {
  result: ExamSessionResult
  onRetry: () => void
}

export default function ExamResultScreen({ result, onRetry }: ExamResultScreenProps) {
  return (
    <div className="exam-result animate-fade-in-up">
      <Card className="exam-result__hero">
        <CardBody>
          <div className="exam-result__icon" aria-hidden="true">
            <Trophy size={32} />
          </div>
          <h1 className="text-heading">Sınav Tamamlandı</h1>
          <p className="text-caption">{result.examTitle}</p>

          <dl className="exam-result__stats">
            <div className="exam-result__stat exam-result__stat--correct">
              <dt>Doğru</dt>
              <dd>{result.correctCount}</dd>
            </div>
            <div className="exam-result__stat exam-result__stat--wrong">
              <dt>Yanlış</dt>
              <dd>{result.wrongCount}</dd>
            </div>
            <div className="exam-result__stat">
              <dt>Boş</dt>
              <dd>{result.emptyCount}</dd>
            </div>
            <div className="exam-result__stat exam-result__stat--net">
              <dt>Net</dt>
              <dd>{result.net}</dd>
            </div>
            <div className="exam-result__stat exam-result__stat--rate">
              <dt>Başarı</dt>
              <dd>%{result.successRate}</dd>
            </div>
            <div className="exam-result__stat">
              <dt>Süre</dt>
              <dd>{formatExamDuration(result.totalDurationSeconds)}</dd>
            </div>
          </dl>

          <div className="exam-result__actions">
            <Button
              variant="primary"
              leftIcon={<RotateCcw size={18} aria-hidden="true" />}
              onClick={onRetry}
            >
              Tekrar Çöz
            </Button>
            <Link to={KPSS_ROUTES.exams}>
              <Button variant="outline">Denemelere Dön</Button>
            </Link>
            {result.wrongCount > 0 ? (
              <Link to={KPSS_ROUTES.questionBank}>
                <Button variant="secondary">Yanlışlarım</Button>
              </Link>
            ) : null}
          </div>
        </CardBody>
      </Card>

      <ExamAnalysisCards breakdown={result.subjectBreakdown} />
    </div>
  )
}
