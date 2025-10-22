import type { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { useEffect } from 'react'
import styles from './Toast.module.css'

export type ToastType = 'info' | 'success' | 'error'

export interface ToastProps {
  message: string
  type: ToastType
  id: number
  onDelete: () => void
  icon: boolean
  delay: number
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
