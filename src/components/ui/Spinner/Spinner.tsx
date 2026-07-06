import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

type SpinnerSize = 'sm' | 'md' | 'lg'

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize
  label?: string
}

export default function Spinner({
  size = 'md',
  label = 'Yükleniyor',
  className,
  ...props
}: SpinnerProps) {
  return (
    <span
      className={cn('spinner', `spinner--${size}`, className)}
      role="status"
      aria-label={label}
      {...props}
    />
  )
}
