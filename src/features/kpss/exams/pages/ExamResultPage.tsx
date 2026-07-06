import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import ExamResultScreen from '../../exam-engine/components/ExamResultScreen'
import type { ExamSessionResult } from '../../exam-engine/types'
import { getLastExamResult } from '../../mock/data'

export default function ExamResultPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const stateResult = (location.state as { result?: ExamSessionResult } | null)?.result
  const result = stateResult ?? getLastExamResult(id)

  if (!result) {
    return (
      <div className="exams-page">
        <h1 className="text-heading">Sonuç bulunamadı</h1>
        <Link to={KPSS_ROUTES.exams}>
          <Button variant="outline">Denemelere Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <ExamResultScreen
      result={result}
      onRetry={() => navigate(KPSS_ROUTES.examDetail(id))}
    />
  )
}
