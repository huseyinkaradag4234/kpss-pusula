import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import type { SubTopic } from '../../types'
import {
  formatStudyDuration,
  getStudyStatusLabel,
  getStudyStatusVariant,
} from '../../utils/subject.utils'

interface SubTopicCardProps {
  subTopic: SubTopic
}

export default function SubTopicCard({ subTopic }: SubTopicCardProps) {
  return (
    <article className="subtopic-card interactive">
      <div className="subtopic-card__header">
        <h3 className="subtopic-card__title">{subTopic.name}</h3>
        <Badge variant={getStudyStatusVariant(subTopic.status)}>
          {getStudyStatusLabel(subTopic.status)}
        </Badge>
      </div>

      <p className="subtopic-card__description">{subTopic.description}</p>

      <dl className="subtopic-card__stats">
        <div>
          <dt>Soru</dt>
          <dd>{subTopic.questionCount}</dd>
        </div>
        <div>
          <dt>Çözülen</dt>
          <dd>{subTopic.solvedCount}</dd>
        </div>
        <div>
          <dt>Süre</dt>
          <dd>{formatStudyDuration(subTopic.estimatedStudyMinutes)}</dd>
        </div>
      </dl>

      <div
        className="subtopic-card__progress"
        role="progressbar"
        aria-valuenow={subTopic.progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          className="subtopic-card__progress-fill"
          style={{ width: `${subTopic.progress}%` }}
        />
      </div>

      <Link to={KPSS_ROUTES.study(subTopic.id)} className="subtopic-card__action">
        <Button
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight size={16} aria-hidden="true" />}
        >
          {subTopic.status === 'not_started' ? 'Başla' : 'Devam Et'}
        </Button>
      </Link>

      <p className="subtopic-card__duration">
        <Clock size={14} aria-hidden="true" />
        Tahmini {formatStudyDuration(subTopic.estimatedStudyMinutes)}
      </p>
    </article>
  )
}
