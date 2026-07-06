import { useMemo, useState, useSyncExternalStore } from 'react'
import { EmptyState } from '../../../../components/ui'
import type { ExamCategoryFilter, ExamListItem } from '../../exam-engine/types'
import { examEngineStore } from '../../exam-engine/store'
import { getExamsList } from '../../mock/data'
import ExamCard from '../components/ExamCard'
import ExamCategoryFilterBar from '../components/ExamCategoryFilterBar'

export default function ExamsPage() {
  const [category, setCategory] = useState<ExamCategoryFilter>('all')
  useSyncExternalStore(examEngineStore.subscribe, examEngineStore.getSnapshot)
  const exams = getExamsList()

  const filteredExams = useMemo(() => {
    if (category === 'all') return exams
    return exams.filter((exam) => exam.category === category)
  }, [exams, category])

  return (
    <div className="exams-page">
      <header className="exams-page__header">
        <h1 className="text-heading">Denemeler</h1>
        <p className="text-caption">
          KPSS Ön Lisans deneme sınavlarıyla kendinizi ölçün. Gerçek sınav deneyimiyle çalışın.
        </p>
      </header>

      <ExamCategoryFilterBar value={category} onChange={setCategory} />

      {filteredExams.length > 0 ? (
        <div className="exams-page__grid">
          {filteredExams.map((exam: ExamListItem) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Deneme bulunamadı"
          description="Seçili kategoride deneme sınavı bulunmuyor."
        />
      )}
    </div>
  )
}
