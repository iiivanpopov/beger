import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Toast.module.css'

export type ToastType = 'info' | 'success' | 'error'

export interface ToastConfig {
  type: ToastType
  message: string
  delay: number
  icon: boolean
}

export interface ToastEntity extends ToastConfig {
  id: number
}

export interface ToastProps extends ToastConfig {
  id: number
  onDelete: () => void
}

const icons: Record<ToastType, LucideIcon> = {
  info: InfoIcon,
  success: CheckCircleIcon,
  error: TriangleAlertIcon,
}

export function Toast({
  message,
  type,
  id,
  icon,
  onDelete,
  delay = 3000,
}: ToastProps) {
  useEffect(() => {
    if (!delay)
      return

    const timeout = setTimeout(onDelete, delay)

    return () => clearTimeout(timeout)
  }, [onDelete, id, delay])

  const Icon = icons[type]

  return (
    <button
      type="button"
      onClick={onDelete}
      className={clsx(styles.toast, styles[type])}
    >
      {icon && <Icon />}
      {message}
    </button>
  )
}

export interface ToastsContainerProps {
  toasts: ToastEntity[]
  deleteToast: (id: number) => void
}

export function ToastsContainer({ toasts, deleteToast }: ToastsContainerProps) {
  return createPortal(
    <div className={styles.container}>
      {toasts.map(({ id, ...props }) => (
        <Toast {...props} key={id} id={id} onDelete={() => deleteToast(id)} />
      ))}
    </div>,
    document.body,
  )
}

Toast.Container = ToastsContainer
