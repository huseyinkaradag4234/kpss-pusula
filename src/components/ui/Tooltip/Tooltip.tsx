import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface TooltipProps {
  content: string
  children: ReactNode
  position?: 'top' | 'bottom'
  className?: string
}

export default function Tooltip({
  content,
  children,
  position = 'top',
  className,
}: TooltipProps) {
  return (
    <span className={cn('tooltip-wrapper', className)}>
      {children}
      <span className={cn('tooltip', `tooltip--${position}`)} role="tooltip">
        {content}
      </span>
    </span>
  )
}
