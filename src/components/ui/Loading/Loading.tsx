import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import Spinner from '../Spinner/Spinner'

export interface LoadingProps {
  label?: string
  fullscreen?: boolean
  children?: ReactNode
  className?: string
}

export default function Loading({
  label = 'Yükleniyor...',
  fullscreen = false,
  children,
  className,
}: LoadingProps) {
  return (
    <div
      className={cn('loading', fullscreen && 'loading--fullscreen', className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="lg" />
      <p className="text-caption">{children ?? label}</p>
    </div>
  )
}
