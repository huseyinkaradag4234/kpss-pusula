import { ArrowRight, Play } from 'lucide-react'
import { Button } from '../ui'

interface ContinueCardProps {
  title: string
  subject: string
  lesson: string
  progress: number
  remaining: string
}

export default function ContinueCard({
  title,
  subject,
  lesson,
  progress,
  remaining,
}: ContinueCardProps) {
  return (
    <section className="continue-card" aria-labelledby="continue-card-title">
      <div className="continue-card__glow" aria-hidden="true" />
      <div className="continue-card__content">
        <div className="continue-card__badge">{subject}</div>
        <h2 id="continue-card-title" className="continue-card__title">
          {title}
        </h2>
        <p className="continue-card__lesson">{lesson}</p>

        <div className="continue-card__progress">
          <div
            className="continue-card__progress-bar"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Ders ilerlemesi"
          >
            <span
              className="continue-card__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="continue-card__meta">
            <span>%{progress} tamamlandı</span>
            <span>{remaining}</span>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          rightIcon={<ArrowRight size={18} aria-hidden="true" />}
          leftIcon={<Play size={18} aria-hidden="true" />}
        >
          Devam Et
        </Button>
      </div>
    </section>
  )
}
