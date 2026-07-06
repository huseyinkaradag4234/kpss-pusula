import { useMemo } from 'react'
import { EmptyState } from '../../../../components/ui'
import ContentFilterBar from '../../components/ContentFilterBar'
import ProgressStatusBadges from '../../components/ProgressStatusBadges'
import { useContentFilter } from '../../hooks/useContentFilter'
import { mockSubjects } from '../../mock/data'
import type { Subject, StudyStatus } from '../../types'
import SubjectCard from '../components/SubjectCard'

function getSubjectStatus(subject: Subject): StudyStatus {
  if (subject.completedTopicCount === subject.topicCount && subject.topicCount > 0) {
    return 'completed'
  }
  if (subject.progress > 0) return 'started'
  return 'not_started'
}

export default function SubjectsPage() {
  const filterFns = useMemo(
    () => ({
      getSearchText: (subject: Subject) => `${subject.name} ${subject.description}`,
      getStatus: getSubjectStatus,
      getProgress: (subject: Subject) => subject.progress,
      getName: (subject: Subject) => subject.name,
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
    items: mockSubjects,
    ...filterFns,
  })

  const totals = useMemo(() => {
    return mockSubjects.reduce(
      (acc, subject) => {
        acc.completed += subject.completedTopicCount
        acc.started += subject.startedTopicCount
        acc.not_started += subject.notStartedTopicCount
        return acc
      },
      { completed: 0, started: 0, not_started: 0 },
    )
  }, [])

  return (
    <div className="subjects-page">
      <header className="subjects-page__header">
        <div>
          <h1 className="text-heading">Dersler</h1>
          <p className="text-caption">
            KPSS Ön Lisans derslerinizi seçin ve konu bazlı çalışmaya başlayın.
          </p>
        </div>
        <ProgressStatusBadges
          completed={totals.completed}
          started={totals.started}
          notStarted={totals.not_started}
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
        searchPlaceholder="Ders ara..."
      />

      {filteredItems.length > 0 ? (
        <div className="subjects-page__grid">
          {filteredItems.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ders bulunamadı"
          description="Arama veya filtre kriterlerinizi değiştirmeyi deneyin."
        />
      )}
    </div>
  )
}
