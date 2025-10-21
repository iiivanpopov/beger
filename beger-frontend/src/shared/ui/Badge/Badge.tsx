import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Badge.module.css'

export interface BadgeProps {
  children: ReactNode
  className?: string
  color: 'accent' | 'black' | 'white'
  size: 'small' | 'medium'
}

export function Badge({ children, className, color, size }: BadgeProps) {
  return <div className={clsx(styles.badge, styles[color], styles[size], className)}>{children}</div>
}
