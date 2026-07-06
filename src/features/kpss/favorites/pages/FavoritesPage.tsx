import { Heart } from 'lucide-react'
import ModulePlaceholder from '../../components/ModulePlaceholder'

export default function FavoritesPage() {
  return (
    <ModulePlaceholder
      title="Favorilerim"
      description="Kaydettiğiniz sorulara hızlıca ulaşın ve tekrar çözün."
      moduleName="Favoriler"
      icon={<Heart size={24} aria-hidden="true" />}
    />
  )
}
