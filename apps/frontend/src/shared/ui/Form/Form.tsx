import type { ComponentProps, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './Form.module.css'

export interface FormProps extends ComponentProps<'form'> {
  children: ReactNode
  className?: string
}

export function Form({ children, className, ...props }: FormProps) {
  return <form {...props} className={clsx(styles.form, className)}>{children}</form>
}

export interface FormFieldProps {
  children: ReactNode
  className?: string
}

export function FormField({ children, className }: FormFieldProps) {
  return (
    <div className={clsx(styles.field, className)}>
      {children}
    </div>
  )
}

export interface FormFieldProps {
  children: ReactNode
  className?: string
}

export function FormLabel({ children, className }: FormFieldProps) {
  return (
    <div className={clsx(styles.label, className)}>
      {children}
    </div>
  )
}

export interface FormErrorProps {
  children: ReactNode
  className?: string
}

export function FormError({ children, className }: FormErrorProps) {
  if (!children)
    return null

  return (
    <div className={clsx(styles.error, className)}>
      {children}
    </div>
  )
}

Form.Field = FormField
Form.Label = FormLabel
Form.Error = FormError
