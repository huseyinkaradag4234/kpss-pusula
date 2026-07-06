import { BookOpen } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function SubjectsPage() {
  return (
    <ModulePlaceholder
      title="Dersler"
      description="KPSS derslerini keşfedin ve konu bazlı çalışmaya başlayın."
      moduleName="Dersler"
      icon={<BookOpen size={24} aria-hidden="true" />}
    />
  )
}
