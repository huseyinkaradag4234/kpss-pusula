import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  children: ReactNode
}

export default function Badge({
  variant = 'default',
  children,
  className,
  ...props
}: BadgeProps) {
  return (
    <span className={cn('badge', `badge--${variant}`, className)} {...props}>
      {children}
    </span>
  )
}
