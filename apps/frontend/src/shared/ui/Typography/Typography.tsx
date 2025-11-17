import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Typography.module.css'

export type TypographyTag = 'h1' | 'h2' | 'div'
export type TypographyVariant = 'heading' | 'subheading' | 'body' | 'caption'

export type TypographyProps<T extends TypographyTag = 'div'> = ComponentProps<T> & {
  tag?: T
  variant?: TypographyVariant
  children: ReactNode
}

export function Typography<T extends TypographyTag = 'div'>({
  tag,
  children,
  className,
  variant = 'body',
  ...props
}: TypographyProps<T>) {
  const Component = tag || 'div'
  return (
    <Component
      {...props}
      className={clsx(styles.typography, styles[variant], className)}
    >
      {children}
    </Component>
  )
}
