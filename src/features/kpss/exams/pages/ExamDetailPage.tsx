import { FileCheck } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ModulePlaceholder from '../../components/ModulePlaceholder'
import { getExamById } from '../../mock/data'

export default function ExamDetailPage() {
  const { id = '' } = useParams()
  const exam = getExamById(id)

  return (
    <ModulePlaceholder
      title={exam?.title ?? 'Deneme Detayı'}
      description={
        exam?.description ??
        'Deneme sınavı çözüm ekranı ve sonuç analizi yakında eklenecek.'
      }
      moduleName={`${exam?.title ?? 'Deneme'} Modülü`}
      icon={<FileCheck size={24} aria-hidden="true" />}
    />
  )
}
