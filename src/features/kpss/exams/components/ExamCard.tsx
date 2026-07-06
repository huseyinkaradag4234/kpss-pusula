import { ArrowRight, Clock, FileQuestion } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import type { ExamListItem } from '../../exam-engine/types'
import {
  formatStudyDuration,
  getDifficultyLabel,
  getDifficultyVariant,
  getStudyStatusLabel,
  getStudyStatusVariant,
} from '../../utils/subject.utils'

interface ExamCardProps {
  exam: ExamListItem
}

export default function ExamCard({ exam }: ExamCardProps) {
  return (
    <article className="exam-card interactive">
      <div className="exam-card__header">
        <span className="exam-card__icon" aria-hidden="true">
          <FileQuestion size={22} />
        </span>
        <Badge variant={getStudyStatusVariant(exam.status)}>
          {getStudyStatusLabel(exam.status)}
        </Badge>
      </div>

      <div className="exam-card__body">
        <h2 className="exam-card__title">{exam.title}</h2>
        <p className="exam-card__description">{exam.description}</p>

        <dl className="exam-card__stats">
          <div>
            <dt>Ders</dt>
            <dd>{exam.subjectName}</dd>
          </div>
          <div>
            <dt>Soru</dt>
            <dd>{exam.questionCount}</dd>
          </div>
          <div>
            <dt>Süre</dt>
            <dd>{exam.durationMinutes} dk</dd>
          </div>
          <div>
            <dt>Zorluk</dt>
            <dd>
              <Badge variant={getDifficultyVariant(exam.difficulty)}>
                {getDifficultyLabel(exam.difficulty)}
              </Badge>
            </dd>
          </div>
        </dl>

        {exam.lastScore !== undefined ? (
          <p className="exam-card__last-score">
            Son başarı: <strong>%{exam.lastScore}</strong>
          </p>
        ) : null}
      </div>

      <div className="exam-card__footer">
        <Link to={KPSS_ROUTES.examDetail(exam.id)}>
          <Button
            variant="primary"
            fullWidth
            rightIcon={<ArrowRight size={16} aria-hidden="true" />}
          >
            {exam.status === 'completed' ? 'Tekrar Çöz' : 'Başla'}
          </Button>
        </Link>
        <p className="exam-card__duration">
          <Clock size={14} aria-hidden="true" />
          Tahmini {formatStudyDuration(exam.durationMinutes)}
        </p>
      </div>
    </article>
  )
}
