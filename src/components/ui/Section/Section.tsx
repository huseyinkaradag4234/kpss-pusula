import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type SectionSize = 'default' | 'sm' | 'lg'

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  size?: SectionSize
  children: ReactNode
}

export default function Section({
  size = 'default',
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        'section',
        size === 'sm' && 'section--sm',
        size === 'lg' && 'section--lg',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
