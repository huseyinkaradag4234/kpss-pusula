import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import ExamPlayer from '../../exam-engine/components/ExamPlayer'
import { getExamDefinitionById } from '../../mock/data'

export default function ExamSessionPage() {
  const { id = '' } = useParams()
  const exam = getExamDefinitionById(id)

  if (!exam) {
    return (
      <div className="exams-page">
        <h1 className="text-heading">Sınav bulunamadı</h1>
        <Link to={KPSS_ROUTES.exams}>
          <Button variant="outline">Denemelere Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="exam-session-page">
      <ExamPlayer
        examId={exam.id}
        examTitle={exam.title}
        durationMinutes={exam.durationMinutes}
      />
    </div>
  )
}
