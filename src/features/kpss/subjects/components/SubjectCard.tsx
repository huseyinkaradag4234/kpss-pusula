import type { CSSProperties } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge, Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { getContinueSubTopicForSubject } from '../../mock/data'
import type { Subject } from '../../types'
import {
  formatStudyDate,
  formatStudyDuration,
  getSubjectIcon,
} from '../../utils/subject.utils'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const Icon = getSubjectIcon(subject.icon)
  const continueSubTopic = getContinueSubTopicForSubject(subject.id)

  return (
    <article
      className="subject-card interactive"
      style={{ '--subject-accent': subject.color } as CSSProperties}
    >
      <div className="subject-card__accent" aria-hidden="true" />

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
          <div>
            <dt>Tahmini süre</dt>
            <dd>{formatStudyDuration(subject.estimatedStudyMinutes)}</dd>
          </div>
        </dl>

        <div className="subject-card__status-row">
          <Badge variant="success">{subject.completedTopicCount} tamam</Badge>
          <Badge variant="warning">{subject.startedTopicCount} devam</Badge>
          <Badge variant="secondary">{subject.notStartedTopicCount} yeni</Badge>
        </div>

        <div
          className="subject-card__progress"
          role="progressbar"
          aria-valuenow={subject.progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className="subject-card__progress-fill"
            style={{ width: `${subject.progress}%`, background: subject.color }}
          />
        </div>
      </div>

      <div className="subject-card__footer">
        <Link to={KPSS_ROUTES.subjectDetail(subject.id)}>
          <Button variant="outline" size="sm">
            Dersi Gör
          </Button>
        </Link>
        {continueSubTopic ? (
          <Link to={KPSS_ROUTES.study(continueSubTopic.id)}>
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

      <p className="subject-card__duration">
        <Clock size={14} aria-hidden="true" />
        Toplam {formatStudyDuration(subject.estimatedStudyMinutes)}
      </p>
    </article>
  )
}
