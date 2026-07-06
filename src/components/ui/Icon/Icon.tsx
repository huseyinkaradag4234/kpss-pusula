import type { LucideIcon } from 'lucide-react'
import { cn } from '../../../utils/cn'

type IconSize = 'sm' | 'md' | 'lg'

const sizeMap: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
}

export interface IconProps {
  icon: LucideIcon
  size?: IconSize
  className?: string
  label?: string
}

export default function Icon({
  icon: LucideIconComponent,
  size = 'md',
  className,
  label,
}: IconProps) {
  return (
    <LucideIconComponent
      className={cn('icon', `icon--${size}`, className)}
      size={sizeMap[size]}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
    />
  )
}
