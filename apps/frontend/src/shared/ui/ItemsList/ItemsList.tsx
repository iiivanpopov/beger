import type { ComponentProps, ElementType, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ItemsList.module.css'

export interface ItemsListProps {
  children: ReactNode
  className?: string
}

export function ItemsList({ children, className }: ItemsListProps) {
  return (
    <div className={clsx(styles.items, className)}>
      {children}
    </div>
  )
}

export interface ItemsListItemProps extends ComponentProps<'button'> {
  children: ReactNode
  active?: boolean
  icon?: ElementType
}

export function ItemsListItem({
  children,
  icon: Icon,
  active,
  className,
  ...props
}: ItemsListItemProps) {
  if (!children)
    return null

  return (
    <button
      type="button"
      className={clsx(styles.item, active && styles.active, className)}
      {...props}
    >
      {Icon && <Icon />}
      {children}
    </button>
  )
}

ItemsList.Item = ItemsListItem
