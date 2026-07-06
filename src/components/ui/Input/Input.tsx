import type { InputHTMLAttributes } from 'react'
import { cn } from '../../../utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  inputClassName?: string
}

export default function Input({
  label,
  hint,
  error,
  id,
  className,
  inputClassName,
  required,
  ...props
}: InputProps) {
  const inputId = id ?? (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined)

  return (
    <div className={cn('input-group', className)}>
      {label ? (
        <label className="input-label" htmlFor={inputId}>
          {label}
          {required ? <span aria-hidden="true"> *</span> : null}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn('input interactive', error && 'input--error', inputClassName)}
        aria-invalid={Boolean(error)}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        required={required}
        {...props}
      />
      {hint && !error ? (
        <p id={`${inputId}-hint`} className="input-hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${inputId}-error`} className="input-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
