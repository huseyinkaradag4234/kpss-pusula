import { HelpCircle } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function QuestionBankPage() {
  return (
    <ModulePlaceholder
      title="Soru Bankası"
      description="Binlerce KPSS sorusuna konu ve zorluk seviyesine göre erişin."
      moduleName="Soru Bankası"
      icon={<HelpCircle size={24} aria-hidden="true" />}
    />
  )
}
