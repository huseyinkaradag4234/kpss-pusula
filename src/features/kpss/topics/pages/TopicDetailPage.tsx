import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, EmptyState } from '../../../../components/ui'
import ContentFilterBar from '../../components/ContentFilterBar'
import ProgressStatusBadges from '../../components/ProgressStatusBadges'
import { KPSS_ROUTES } from '../../constants/routes'
import { useContentFilter } from '../../hooks/useContentFilter'
import {
  countItemsByStatus,
  getSubjectById,
  getSubTopicsByTopicId,
  getTopicById,
} from '../../mock/data'
import type { SubTopic } from '../../types'
import { formatStudyDuration } from '../../utils/subject.utils'
import SubTopicCard from '../components/SubTopicCard'

export default function TopicDetailPage() {
  const { id = '' } = useParams()
  const topic = getTopicById(id)
  const subject = topic ? getSubjectById(topic.subjectId) : undefined
  const subTopics = topic ? getSubTopicsByTopicId(topic.id) : []

  const filterFns = useMemo(
    () => ({
      getSearchText: (subTopic: SubTopic) => `${subTopic.name} ${subTopic.description}`,
      getStatus: (subTopic: SubTopic) => subTopic.status,
      getProgress: (subTopic: SubTopic) => subTopic.progress,
      getName: (subTopic: SubTopic) => subTopic.name,
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
    items: subTopics,
    ...filterFns,
  })

  if (!topic) {
    return (
      <div className="subjects-page">
        <h1 className="text-heading">Konu bulunamadı</h1>
        <Link to={KPSS_ROUTES.subjects}>
          <Button variant="outline">Derslere Dön</Button>
        </Link>
      </div>
    )
  }

  const statusCounts = countItemsByStatus(subTopics)

  return (
    <div className="topic-page">
      {subject ? (
        <p className="text-caption topic-page__breadcrumb">
          <Link to={KPSS_ROUTES.subjects}>Dersler</Link>
          {' / '}
          <Link to={KPSS_ROUTES.subjectDetail(subject.id)}>{subject.name}</Link>
          {' / '}
          {topic.name}
        </p>
      ) : null}

      <header className="topic-detail__header">
        <div>
          <h1 className="text-heading">{topic.name}</h1>
          <p className="text-caption">{topic.description}</p>
          <p className="text-caption topic-detail__meta">
            {topic.subTopicCount} alt konu · {topic.questionCount} soru ·{' '}
            {formatStudyDuration(topic.estimatedStudyMinutes)}
          </p>
        </div>
        <ProgressStatusBadges
          completed={statusCounts.completed}
          started={statusCounts.started}
          notStarted={statusCounts.not_started}
        />
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
        searchPlaceholder="Alt konu ara..."
      />

      <section aria-labelledby="subtopics-heading">
        <h2 id="subtopics-heading" className="dashboard-section__title">
          Alt Konular
        </h2>
        {filteredItems.length > 0 ? (
          <div className="subtopics-page__grid">
            {filteredItems.map((subTopic) => (
              <SubTopicCard key={subTopic.id} subTopic={subTopic} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Alt konu bulunamadı"
            description="Arama veya filtre kriterlerinizi değiştirmeyi deneyin."
          />
        )}
      </section>
    </div>
  )
}
