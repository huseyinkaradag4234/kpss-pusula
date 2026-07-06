import type { ExamCategoryFilter } from '../../exam-engine/types'
import { EXAM_CATEGORY_LABELS } from '../../exam-engine/types'

interface ExamCategoryFilterBarProps {
  value: ExamCategoryFilter
  onChange: (value: ExamCategoryFilter) => void
}

const CATEGORIES = Object.keys(EXAM_CATEGORY_LABELS) as ExamCategoryFilter[]

export default function ExamCategoryFilterBar({
  value,
  onChange,
}: ExamCategoryFilterBarProps) {
  return (
    <div className="exam-category-filter" role="group" aria-label="Deneme kategorisi">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={`exam-category-filter__chip interactive${
            value === category ? ' exam-category-filter__chip--active' : ''
          }`}
          onClick={() => onChange(category)}
          aria-pressed={value === category}
        >
          {EXAM_CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  )
}
