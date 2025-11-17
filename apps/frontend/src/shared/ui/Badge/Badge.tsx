import type { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Badge.module.css'

export type BadeColor = 'accent' | 'black' | 'white'
export type BadgeSize = 'small' | 'medium'

export interface BadgeProps {
  children: ReactNode
  className?: string
  color: BadeColor
  size: BadgeSize
}

export function Badge({ children, className, color, size }: BadgeProps) {
  return <div className={clsx(styles.badge, styles[color], styles[size], className)}>{children}</div>
}
