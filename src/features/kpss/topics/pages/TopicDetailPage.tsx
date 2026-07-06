import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui'
import { getSubjectById, getTopicById } from '../../mock/data'
import QuestionPlayer from '../../question-engine/components/QuestionPlayer'

export default function TopicDetailPage() {
  const { id = '' } = useParams()
  const topic = getTopicById(id)
  const subject = topic ? getSubjectById(topic.subjectId) : undefined

  if (!topic) {
    return (
      <div className="subjects-page">
        <h1 className="text-heading">Konu bulunamadı</h1>
        <Link to="/subjects">
          <Button variant="outline">Derslere Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="topic-page">
      {subject ? (
        <p className="text-caption topic-page__breadcrumb">
          <Link to={`/subjects/${subject.id}`}>{subject.name}</Link>
          {' / '}
          {topic.name}
        </p>
      ) : null}
      <QuestionPlayer topicId={topic.id} />
    </div>
  )
}
