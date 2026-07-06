import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import type { Subject } from '../../types'
import {
  formatStudyDate,
  getSubjectIcon,
} from '../../utils/subject.utils'
import { getTopicsBySubjectId } from '../../mock/data'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = getSubjectIcon(subject.icon)
  const firstTopic = getTopicsBySubjectId(subject.id)[0]

  return (
    <article className="subject-card interactive">
      <div className="subject-card__header">
        <span
          className="subject-card__icon"
          style={{ background: `${subject.color}20`, color: subject.color }}
          aria-hidden="true"
        >
          <Icon size={24} />
        </span>
        <Badge variant="primary">%{subject.progress}</Badge>
      </div>

      <div className="subject-card__body">
        <h2 className="subject-card__title">{subject.name}</h2>
        <p className="subject-card__description">{subject.description}</p>

        <dl className="subject-card__stats">
          <div>
            <dt>Toplam konu</dt>
            <dd>{subject.topicCount}</dd>
          </div>
          <div>
            <dt>Tamamlanan</dt>
            <dd>{subject.completedTopicCount}</dd>
          </div>
          <div>
            <dt>Son çalışma</dt>
            <dd>{formatStudyDate(subject.lastStudiedAt)}</dd>
          </div>
        </dl>

        <div className="subject-card__progress" role="progressbar" aria-valuenow={subject.progress} aria-valuemin={0} aria-valuemax={100}>
          <span className="subject-card__progress-fill" style={{ width: `${subject.progress}%`, background: subject.color }} />
        </div>
      </div>

      <div className="subject-card__footer">
        <Link to={KPSS_ROUTES.subjectDetail(subject.id)}>
          <Button variant="outline" size="sm">
            Dersi Gör
          </Button>
        </Link>
        {firstTopic ? (
          <Link to={KPSS_ROUTES.topicDetail(firstTopic.id)}>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight size={16} aria-hidden="true" />}
            >
              Devam Et
            </Button>
          </Link>
        ) : null}
      </div>
    </article>
  )
}
