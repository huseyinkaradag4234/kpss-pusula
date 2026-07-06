import { Trophy } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function AchievementsPage() {
  return (
    <ModulePlaceholder
      title="Başarılar"
      description="Rozetlerinizi kazanın ve çalışma motivasyonunuzu artırın."
      moduleName="Başarılar"
      icon={<Trophy size={24} aria-hidden="true" />}
    />
  )
}
