import { Target } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function DailyGoalsPage() {
  return (
    <ModulePlaceholder
      title="Günlük Hedefler"
      description="Günlük soru hedeflerinizi belirleyin ve takip edin."
      moduleName="Günlük Hedefler"
      icon={<Target size={24} aria-hidden="true" />}
    />
  )
}
