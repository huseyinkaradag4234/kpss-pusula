import { ClipboardList } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function ExamsPage() {
  return (
    <ModulePlaceholder
      title="Denemeler"
      description="Konu testleri ve tam KPSS denemeleriyle kendinizi ölçün."
      moduleName="Denemeler"
      icon={<ClipboardList size={24} aria-hidden="true" />}
    />
  )
}
