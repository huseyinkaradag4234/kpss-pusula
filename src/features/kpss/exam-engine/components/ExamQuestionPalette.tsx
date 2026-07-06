import type { ExamAnswerState } from '../types'

type PaletteStatus = 'empty' | 'answered' | 'marked'

interface ExamQuestionPaletteProps {
  total: number
  currentIndex: number
  answers: Record<string, ExamAnswerState>
  questionIds: string[]
  onSelect: (index: number) => void
}

function getStatus(answer: ExamAnswerState | undefined): PaletteStatus {
  if (answer?.marked) return 'marked'
  if (answer?.selectedIndex !== null && answer?.selectedIndex !== undefined) {
    return 'answered'
  }
  return 'empty'
}

export default function ExamQuestionPalette({
  total,
  currentIndex,
  answers,
  questionIds,
  onSelect,
}: ExamQuestionPaletteProps) {
  return (
    <nav className="exam-palette" aria-label="Soru paleti">
      <h3 className="exam-palette__title">Soru Paleti</h3>
      <ul className="exam-palette__grid">
        {Array.from({ length: total }, (_, index) => {
          const questionId = questionIds[index]
          const status = getStatus(questionId ? answers[questionId] : undefined)
          const isCurrent = index === currentIndex

          return (
            <li key={questionId ?? index}>
              <button
                type="button"
                className={`exam-palette__item exam-palette__item--${status}${
                  isCurrent ? ' exam-palette__item--current' : ''
                }`}
                onClick={() => onSelect(index)}
                aria-label={`Soru ${index + 1}`}
                aria-current={isCurrent ? 'true' : undefined}
              >
                {index + 1}
              </button>
            </li>
          )
        })}
      </ul>
      <ul className="exam-palette__legend">
        <li><span className="exam-palette__swatch exam-palette__swatch--empty" /> Boş</li>
        <li><span className="exam-palette__swatch exam-palette__swatch--answered" /> Cevaplanan</li>
        <li><span className="exam-palette__swatch exam-palette__swatch--marked" /> İşaretlenen</li>
      </ul>
    </nav>
  )
}
