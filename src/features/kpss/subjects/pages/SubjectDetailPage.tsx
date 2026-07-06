import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { getSubjectById, getTopicsBySubjectId } from '../../mock/data'
import { getSubjectIcon } from '../../utils/subject.utils'
import TopicCard from '../../topics/components/TopicCard'

export default function SubjectDetailPage() {
  const { id = '' } = useParams()
  const subject = getSubjectById(id)
  const topics = getTopicsBySubjectId(id)

  if (!subject) {
    return (
      <div className="subjects-page">
        <h1 className="text-heading">Ders bulunamadı</h1>
        <Link to={KPSS_ROUTES.subjects}>
          <Button variant="outline">Derslere Dön</Button>
        </Link>
      </div>
    )
  }

  const Icon = getSubjectIcon(subject.icon)

  return (
    <div className="subjects-page">
      <header className="subject-detail__header">
        <span
          className="subject-detail__icon"
          style={{ background: `${subject.color}20`, color: subject.color }}
          aria-hidden="true"
        >
          <Icon size={28} />
        </span>
        <div>
          <h1 className="text-heading">{subject.name}</h1>
          <p className="text-caption">{subject.description}</p>
          <p className="text-caption subject-detail__meta">
            {subject.topicCount} konu · %{subject.progress} tamamlandı
          </p>
        </div>
      </header>

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="dashboard-section__title">
          Konular
        </h2>
        <div className="topics-page__grid">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
      </section>
    </div>
  )
}
