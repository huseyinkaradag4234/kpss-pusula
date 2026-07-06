import { AlertTriangle } from 'lucide-react'
import { isSupabaseConfigured } from '../../config/env'
import { Badge, Card, CardBody } from '../ui'

export default function SupabaseConfigNotice() {
  if (isSupabaseConfigured()) {
    return null
  }

  return (
    <div className="supabase-config-notice" role="status" aria-live="polite">
      <Card className="supabase-config-notice__card">
        <CardBody>
          <div className="supabase-config-notice__header">
            <span className="supabase-config-notice__icon" aria-hidden="true">
              <AlertTriangle size={20} />
            </span>
            <div>
              <Badge variant="warning">Yapılandırma</Badge>
              <h2 className="supabase-config-notice__title">
                Supabase is not configured for this deployment.
              </h2>
            </div>
          </div>
          <p className="supabase-config-notice__text">
            Bu ortamda <code>VITE_SUPABASE_URL</code> ve{' '}
            <code>VITE_SUPABASE_ANON_KEY</code> tanımlı değil. Uygulama
            çalışmaya devam eder; kimlik doğrulama ve veritabanı özellikleri
            devre dışıdır.
          </p>
          <p className="supabase-config-notice__hint">
            Bolt veya hosting panelinizden bu değişkenleri ekleyip yeniden
            deploy edin. Yerel geliştirmede <code>.env.local</code> dosyasını
            kullanın.
          </p>
        </CardBody>
      </Card>
    </div>
  )
}
