import type { ReactNode } from 'react'
import type { Element, PropsOf } from '@/shared/types'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

export type ButtonVariant = 'contained' | 'ghost'
export type ButtonColor = 'primary' | 'white'
export type ButtonSize = 'small' | 'medium'

export type ButtonProps<C extends Element = 'button'> = {
  variant?: ButtonVariant
  color?: ButtonColor
  size?: ButtonSize
  icon?: boolean
  loading?: boolean
  children?: ReactNode
  component?: C
} & PropsOf<C>

export function Button<C extends Element = 'button'>({
  children,
  type = 'button',
  variant = 'contained',
  component = 'button',
  color = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  icon = false,
  className,
  ...props
}: ButtonProps<C>) {
  const Component = component

  return (
    <Component
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
      disabled={loading || disabled}
    >
      {loading && <LoaderCircle className={styles.spinner} />}
      <div className={styles.content}>{children}</div>
    </Component>
  )
}
