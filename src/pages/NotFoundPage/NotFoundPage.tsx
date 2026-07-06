import { Link } from 'react-router-dom'
import { Button, PageHeader } from '../../components/ui'
import Section from '../../components/ui/Section/Section'

export default function NotFoundPage() {
  return (
    <Section>
      <PageHeader
        title="Sayfa Bulunamadı"
        description="Aradığınız sayfa mevcut değil veya taşınmış olabilir."
      />
      <p className="not-found__code">404</p>
      <div style={{ marginTop: 'var(--space-4)' }}>
        <Link to="/">
          <Button variant="primary">Ana sayfaya dön</Button>
        </Link>
      </div>
    </Section>
  )
}
