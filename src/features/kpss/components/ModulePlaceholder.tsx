import type { ReactNode } from 'react'
import { Badge, Card, CardBody, EmptyState } from '../../../components/ui'

export interface ModulePlaceholderProps {
  title: string
  description: string
  moduleName: string
  icon?: ReactNode
}

export default function ModulePlaceholder({
  title,
  description,
  moduleName,
  icon,
}: ModulePlaceholderProps) {
  return (
    <div className="module-placeholder">
      <header className="module-placeholder__header">
        <h1 className="text-heading">{title}</h1>
        <p className="text-caption module-placeholder__description">{description}</p>
      </header>

      <EmptyState
        icon={icon}
        title="Bu modül hazırlanıyor"
        description={`${moduleName} modülü yakında kullanıma açılacak.`}
        action={
          <Card className="module-placeholder__card">
            <CardBody>
              <Badge variant="warning">Yakında</Badge>
              <p className="module-placeholder__info">
                Sprint 6 ile birlikte {moduleName} modülü aktif hale gelecek.
                Şimdilik temel altyapı ve navigasyon hazır.
              </p>
            </CardBody>
          </Card>
        }
      />
    </div>
  )
}
