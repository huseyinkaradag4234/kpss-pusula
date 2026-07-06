import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../../components/ui'
import { KPSS_ROUTES } from '../../constants/routes'
import { getSubTopicById, getSubjectById, getTopicById } from '../../mock/data'
import QuestionPlayer from '../../question-engine/components/QuestionPlayer'

export default function StudyPage() {
  const { subTopicId = '' } = useParams()
  const subTopic = getSubTopicById(subTopicId)
  const topic = subTopic ? getTopicById(subTopic.topicId) : undefined
  const subject = subTopic ? getSubjectById(subTopic.subjectId) : undefined

  if (!subTopic || !topic) {
    return (
      <div className="subjects-page">
        <h1 className="text-heading">Çalışma oturumu bulunamadı</h1>
        <Link to={KPSS_ROUTES.subjects}>
          <Button variant="outline">Derslere Dön</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="topic-page">
      <p className="text-caption topic-page__breadcrumb">
        <Link to={KPSS_ROUTES.subjects}>Dersler</Link>
        {' / '}
        {subject ? (
          <>
            <Link to={KPSS_ROUTES.subjectDetail(subject.id)}>{subject.name}</Link>
            {' / '}
          </>
        ) : null}
        <Link to={KPSS_ROUTES.topicDetail(topic.id)}>{topic.name}</Link>
        {' / '}
        {subTopic.name}
      </p>

      <QuestionPlayer topicId={topic.id} subTopicId={subTopic.id} />
    </div>
  )
}
