import { BookMarked } from 'lucide-react'
import { useParams } from 'react-router-dom'
import ModulePlaceholder from '../../components/ModulePlaceholder'
import { getSubjectById } from '../../mock/data'

export default function SubjectDetailPage() {
  const { id = '' } = useParams()
  const subject = getSubjectById(id)

  return (
    <ModulePlaceholder
      title={subject?.name ?? 'Ders Detayı'}
      description={
        subject?.description ??
        'Seçili dersin konuları ve soru bankası yakında burada olacak.'
      }
      moduleName={`${subject?.name ?? 'Ders'} Detayı`}
      icon={<BookMarked size={24} aria-hidden="true" />}
    />
  )
}
