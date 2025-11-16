import type { ReactNode } from 'react'
import type { Element, PropsOf } from '@/shared/types'
import clsx from 'clsx'
import { LoaderCircle } from 'lucide-react'
import styles from './Button.module.css'

type Variant = 'contained' | 'ghost'
type Color = 'primary' | 'white'
type Size = 'small' | 'medium'

export type ButtonProps<C extends Element = 'button'> = {
  variant?: Variant
  color?: Color
  size?: Size
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
