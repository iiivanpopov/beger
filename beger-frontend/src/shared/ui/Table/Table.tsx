import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Table.module.css'

export interface TableProps extends ComponentProps<'table'> {
  children: ReactNode
}

export function Table({ children, className, ...props }: TableProps) {
  return (
    <table className={clsx(styles.table, className)} {...props}>
      {children}
    </table>
  )
}

export interface TableHeaderProps extends ComponentProps<'thead'> {
  children: ReactNode
}

export function TableHeader({ children, className, ...props }: TableHeaderProps) {
  return (
    <thead className={clsx(styles.header, className)} {...props}>
      {children}
    </thead>
  )
}

export interface TableBodyProps extends ComponentProps<'tbody'> {
  children: ReactNode
}

export function TableBody({ children, className, ...props }: TableBodyProps) {
  return (
    <tbody className={clsx(styles.body, className)} {...props}>
      {children}
    </tbody>
  )
}

export interface TableRowProps extends ComponentProps<'tr'> {
  children: ReactNode
}

export function TableRow({ children, className, ...props }: TableRowProps) {
  return (
    <tr className={clsx(styles.row, className)} {...props}>
      {children}
    </tr>
  )
}

export interface TableCellProps extends ComponentProps<'td'> {
  children?: ReactNode
  as?: 'th' | 'td'
}

export function TableCell({ children, className, as: Component = 'td', ...props }: TableCellProps) {
  return (
    <Component className={clsx(styles.cell, className)} {...props}>
      {children}
    </Component>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell
