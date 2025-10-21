import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Card.module.css'

export interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={clsx(styles.card, className)}>
      {children}
    </div>
  )
}

export interface CardIndexProps {
  children: ReactNode
  className?: string
}

export function CardIndex({ children, className }: CardIndexProps) {
  return (
    <div className={clsx(styles.index, className)}>
      #
      {children}
    </div>
  )
}

export interface CardActionProps extends ComponentProps<'button'> {
  children: ReactNode
  className?: string
}

export function CardAction({ children, className, ...props }: CardActionProps) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.action, className)}
    >
      {children}
    </button>
  )
}

export interface CardContentProps {
  children: ReactNode
  className?: string
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx(styles.content, className)}>
      {children}
    </div>
  )
}

export interface CardRowProps {
  children: ReactNode
  className?: string
}

export function CardRow({ children, className }: CardRowProps) {
  return (
    <div className={clsx(styles.row, className)}>
      {children}
    </div>
  )
}

Card.Content = CardContent
Card.Index = CardIndex
Card.Row = CardRow
Card.Action = CardAction
