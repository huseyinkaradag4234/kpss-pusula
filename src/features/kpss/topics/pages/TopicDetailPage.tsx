import { Layers } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ModulePlaceholder from '../../components/ModulePlaceholder'
import { getTopicById } from '../../mock/data'

export default function TopicDetailPage() {
  const { id = '' } = useParams()
  const topic = getTopicById(id)

  return (
    <ModulePlaceholder
      title={topic?.name ?? 'Konu Detayı'}
      description={
        topic?.description ??
        'Konu anlatımı ve soru çözümü bu sayfada yer alacak.'
      }
      moduleName={`${topic?.name ?? 'Konu'} Modülü`}
      icon={<Layers size={24} aria-hidden="true" />}
    />
  )
}
