import { BarChart3 } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function StatisticsPage() {
  return (
    <ModulePlaceholder
      title="İstatistikler"
      description="Performans grafikleri ve detaylı analiz raporları."
      moduleName="İstatistikler"
      icon={<BarChart3 size={24} aria-hidden="true" />}
    />
  )
}
