import type { HTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'
import { getInitials } from '../../../utils/cn'

type AvatarSize = 'sm' | 'md' | 'lg'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: AvatarSize
}

export default function Avatar({
  src,
  alt,
  name = '',
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(name || alt || '?')

  return (
    <div
      className={cn('avatar', `avatar--${size}`, className)}
      role="img"
      aria-label={alt || name || 'Avatar'}
      {...props}
    >
      {src ? (
        <img className="avatar__image" src={src} alt={alt || name} />
      ) : (
        <span aria-hidden="true">{initials}</span>
      )}
    </div>
  )
}
