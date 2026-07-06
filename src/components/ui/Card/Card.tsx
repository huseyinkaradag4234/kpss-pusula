import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils/cn'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export function Card({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('card', className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('card__header', className)} {...props}>
      {children}
    </div>
  )
}

export function CardBody({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('card__body', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: CardProps) {
  return (
    <div className={cn('card__footer', className)} {...props}>
      {children}
    </div>
  )
}
