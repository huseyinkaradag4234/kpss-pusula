import { Clock } from 'lucide-react'
import type { RecentStudy } from '../../constants/dashboard'
import { Badge } from '../ui'
import { cn } from '../../utils/cn'

interface RecentStudiesProps {
  studies: RecentStudy[]
  className?: string
}

export default function RecentStudies({ studies, className }: RecentStudiesProps) {
  return (
    <section
      className={cn('recent-studies', className)}
      aria-labelledby="recent-studies-title"
    >
      <h2 id="recent-studies-title" className="dashboard-section__title">
        Son Çalışmalar
      </h2>
      <ul className="recent-studies__list">
        {studies.map((study) => (
          <li key={study.id}>
            <article className="recent-study-card interactive">
              <div className="recent-study-card__top">
                <div>
                  <Badge variant="primary">{study.subject}</Badge>
                  <h3 className="recent-study-card__title">{study.title}</h3>
                </div>
                <span className="recent-study-card__time">
                  <Clock size={14} aria-hidden="true" />
                  {study.lastStudied}
                </span>
              </div>
              <div className="recent-study-card__progress">
                <div
                  className="recent-study-card__progress-bar"
                  role="progressbar"
                  aria-valuenow={study.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${study.title} ilerlemesi`}
                >
                  <span
                    className="recent-study-card__progress-fill"
                    style={{ width: `${study.progress}%` }}
                  />
                </div>
                <span className="recent-study-card__progress-text">
                  %{study.progress}
                </span>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
