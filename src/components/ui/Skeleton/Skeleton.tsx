import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

type SkeletonVariant = 'text' | 'title' | 'avatar' | 'card'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: SkeletonVariant
}

export default function Skeleton({
  variant = 'text',
  className,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn('skeleton', `skeleton--${variant}`, className)}
      aria-hidden="true"
      {...props}
    />
  )
}
