import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, EmptyState } from '../../../../components/ui'
import ContentFilterBar from '../../components/ContentFilterBar'
import ProgressStatusBadges from '../../components/ProgressStatusBadges'
import { KPSS_ROUTES } from '../../constants/routes'
import { useContentFilter } from '../../hooks/useContentFilter'
import {
  countTopicsByStatus,
  getSubjectById,
  getTopicsBySubjectId,
} from '../../mock/data'
import type { Topic } from '../../types'
import { formatStudyDuration, getSubjectIcon } from '../../utils/subject.utils'
import TopicCard from '../../topics/components/TopicCard'

export default function SubjectDetailPage() {
  const { id = '' } = useParams()
  const subject = getSubjectById(id)
  const topics = getTopicsBySubjectId(id)

  const filterFns = useMemo(
    () => ({
      getSearchText: (topic: Topic) => `${topic.name} ${topic.description}`,
      getStatus: (topic: Topic) => topic.status,
      getProgress: (topic: Topic) => topic.progress,
      getName: (topic: Topic) => topic.name,
    }),
    [],
  )

  const {
    query,
    setQuery,
    sort,
    setSort,
    status,
    setStatus,
    filteredItems,
    resultCount,
    totalCount,
  } = useContentFilter({
    items: topics,
    ...filterFns,
  })

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
  const statusCounts = countTopicsByStatus(topics)

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
        <div className="subject-detail__intro">
          <h1 className="text-heading">{subject.name}</h1>
          <p className="text-caption">{subject.description}</p>
          <p className="text-caption subject-detail__meta">
            {subject.topicCount} konu · %{subject.progress} tamamlandı ·{' '}
            {formatStudyDuration(subject.estimatedStudyMinutes)}
          </p>
          <ProgressStatusBadges
            completed={statusCounts.completed}
            started={statusCounts.started}
            notStarted={statusCounts.not_started}
            className="subject-detail__badges"
          />
        </div>
      </header>

      <ContentFilterBar
        query={query}
        onQueryChange={setQuery}
        sort={sort}
        onSortChange={setSort}
        status={status}
        onStatusChange={setStatus}
        resultCount={resultCount}
        totalCount={totalCount}
        searchPlaceholder="Konu ara..."
      />

      <section aria-labelledby="topics-heading">
        <h2 id="topics-heading" className="dashboard-section__title">
          Konular
        </h2>
        {filteredItems.length > 0 ? (
          <div className="topics-page__grid">
            {filteredItems.map((topic) => (
              <TopicCard key={topic.id} topic={topic} accentColor={subject.color} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Konu bulunamadı"
            description="Arama veya filtre kriterlerinizi değiştirmeyi deneyin."
          />
        )}
      </section>
    </div>
  )
}
