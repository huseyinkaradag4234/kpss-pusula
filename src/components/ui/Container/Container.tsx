import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'fluid'

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize
  children: ReactNode
}

export default function Container({
  size = 'xl',
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn('container', size !== 'fluid' && `container--${size}`, className)}
      {...props}
    >
      {children}
    </div>
  )
}
