import { TrendingUp } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function ProgressPage() {
  return (
    <ModulePlaceholder
      title="İlerleme"
      description="Ders ve konu bazında çalışma ilerlemenizi takip edin."
      moduleName="İlerleme"
      icon={<TrendingUp size={24} aria-hidden="true" />}
    />
  )
}
