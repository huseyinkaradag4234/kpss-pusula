import { TrendingDown, TrendingUp } from 'lucide-react'
import type { ExamSubjectAnalysis } from '../types'
import { getStrongestSubject, getWeakestSubject } from '../utils/exam.utils'

interface ExamAnalysisCardsProps {
  breakdown: ExamSubjectAnalysis[]
}

export default function ExamAnalysisCards({ breakdown }: ExamAnalysisCardsProps) {
  const strongest = getStrongestSubject(breakdown)
  const weakest = getWeakestSubject(breakdown)

  return (
    <section className="exam-analysis" aria-label="Ders analizi">
      <h2 className="dashboard-section__title">Ders Analizi</h2>
      <div className="exam-analysis__grid">
        {strongest ? (
          <article className="exam-analysis__card exam-analysis__card--strong">
            <TrendingUp size={20} aria-hidden="true" />
            <div>
              <p className="exam-analysis__label">En Başarılı Ders</p>
              <h3 className="exam-analysis__subject">{strongest.subjectName}</h3>
              <p className="exam-analysis__stat">
                %{strongest.successRate} · {strongest.correct}/{strongest.total} doğru
              </p>
            </div>
          </article>
        ) : null}

        {weakest ? (
          <article className="exam-analysis__card exam-analysis__card--weak">
            <TrendingDown size={20} aria-hidden="true" />
            <div>
              <p className="exam-analysis__label">Geliştirilmesi Gereken</p>
              <h3 className="exam-analysis__subject">{weakest.subjectName}</h3>
              <p className="exam-analysis__stat">
                %{weakest.successRate} · {weakest.wrong} yanlış
              </p>
            </div>
          </article>
        ) : null}

        {breakdown.map((item) => (
          <article key={item.subjectId} className="exam-analysis__card">
            <h3 className="exam-analysis__subject">{item.subjectName}</h3>
            <dl className="exam-analysis__breakdown">
              <div><dt>Doğru</dt><dd>{item.correct}</dd></div>
              <div><dt>Yanlış</dt><dd>{item.wrong}</dd></div>
              <div><dt>Boş</dt><dd>{item.empty}</dd></div>
              <div><dt>Başarı</dt><dd>%{item.successRate}</dd></div>
            </dl>
            <div className="exam-analysis__bar" role="progressbar" aria-valuenow={item.successRate} aria-valuemin={0} aria-valuemax={100}>
              <span style={{ width: `${item.successRate}%` }} />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
