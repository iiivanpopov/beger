import type { ToastEntity } from '@/providers/ToastsProvider'
import { createPortal } from 'react-dom'
import { Toast } from '@/shared/ui'
import styles from './ToastsContainer.module.css'

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
