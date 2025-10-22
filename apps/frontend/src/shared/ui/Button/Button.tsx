import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

type Variant = 'contained' | 'ghost'
type Color = 'primary' | 'white'
type Size = 'small' | 'medium'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: Variant
  color?: Color
  size?: Size
  icon?: boolean
  loading?: boolean
  children: ReactNode
}

export function Button({
  children,
  type = 'button',
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  loading = false,
  icon = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[color],
        styles[size],
        icon && styles.icon,
        loading && styles.loading,
        className,
      )}
      disabled={loading || props.disabled}
    >
      {loading && <LoaderCircle className={styles.spinner} />}
      <div className={styles.content}>{children}</div>
    </button>
  )
}
