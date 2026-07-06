import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  label?: string
}

export default function Divider({
  orientation = 'horizontal',
  label,
  className,
  ...props
}: DividerProps) {
  if (label) {
    return (
      <div className={cn('divider divider--with-text', className)} role="separator">
        <span>{label}</span>
      </div>
    )
  }

  return (
    <hr
      className={cn(
        'divider',
        orientation === 'vertical' && 'divider--vertical',
        className,
      )}
      role="separator"
      {...props}
    />
  )
}
