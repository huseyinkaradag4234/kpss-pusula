import { Clock, FileQuestion, ListChecks } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, CardBody } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { EXAM_RULES } from '../../exam-engine/types'
import { getExamDefinitionById } from '../../mock/data'

export default function ExamDetailPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const exam = getExamDefinitionById(id)

  if (!exam) {
    return (
      <div className="exams-page">
        <h1 className="text-heading">Deneme bulunamadı</h1>
        <Link to={KPSS_ROUTES.exams}>
          <Button variant="outline">Denemelere Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="exam-start">
      <header className="exam-start__header">
        <span className="exam-start__icon" aria-hidden="true">
          <FileQuestion size={32} />
        </span>
        <div>
          <h1 className="text-heading">{exam.title}</h1>
          <p className="text-caption">{exam.description}</p>
        </div>
      </header>

      <div className="exam-start__summary">
        <Card>
          <CardBody className="exam-start__stat">
            <FileQuestion size={20} aria-hidden="true" />
            <div>
              <p className="exam-start__stat-label">Soru Sayısı</p>
              <p className="exam-start__stat-value">{exam.questionCount}</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="exam-start__stat">
            <Clock size={20} aria-hidden="true" />
            <div>
              <p className="exam-start__stat-label">Süre</p>
              <p className="exam-start__stat-value">{exam.durationMinutes} dakika</p>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="exam-start__stat">
            <ListChecks size={20} aria-hidden="true" />
            <div>
              <p className="exam-start__stat-label">Ders</p>
              <p className="exam-start__stat-value">{exam.subjectName}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card className="exam-start__rules">
        <CardBody>
          <h2 className="dashboard-section__title">Sınav Kuralları</h2>
          <ul className="exam-start__rules-list">
            {EXAM_RULES.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <div className="exam-start__actions">
        <Button variant="outline" onClick={() => navigate(KPSS_ROUTES.exams)}>
          Geri
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate(KPSS_ROUTES.examSession(exam.id))}
        >
          Sınava Başla
        </Button>
      </div>
    </div>
  )
}
