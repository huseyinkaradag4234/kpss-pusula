import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import type { Topic } from '../../types'
import {
  getDifficultyLabel,
  getDifficultyVariant,
} from '../../utils/subject.utils'

interface TopicCardProps {
  topic: Topic
}

export default function TopicCard({ topic }: TopicCardProps) {
  return (
    <article className="topic-card interactive">
      <div className="topic-card__header">
        <h3 className="topic-card__title">{topic.name}</h3>
        <Badge variant={getDifficultyVariant(topic.difficulty)}>
          {getDifficultyLabel(topic.difficulty)}
        </Badge>
      </div>

      <p className="topic-card__description">{topic.description}</p>

      <dl className="topic-card__stats">
        <div>
          <dt>Toplam soru</dt>
          <dd>{topic.questionCount}</dd>
        </div>
        <div>
          <dt>Çözülen</dt>
          <dd>{topic.solvedCount}</dd>
        </div>
        <div>
          <dt>Doğru oranı</dt>
          <dd>%{topic.correctRate}</dd>
        </div>
      </dl>

      <div className="topic-card__progress" role="progressbar" aria-valuenow={topic.progress} aria-valuemin={0} aria-valuemax={100}>
        <span className="topic-card__progress-fill" style={{ width: `${topic.progress}%` }} />
      </div>

      <Link to={KPSS_ROUTES.topicDetail(topic.id)} className="topic-card__action">
        <Button
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight size={16} aria-hidden="true" />}
        >
          Devam Et
        </Button>
      </Link>
    </article>
  )
}
