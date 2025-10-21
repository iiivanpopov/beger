import { use } from 'react'
import { createPortal } from 'react-dom'
import { Toast } from '@/shared/ui'
import { ToastsContext } from '../../providers/ToastsProvider'
import styles from './ToastsContainer.module.css'

export function ToastsContainer() {
  const { toasts, deleteToast } = use(ToastsContext)

  return createPortal(
    <Toast.Container className={styles.container}>
      {toasts.map(({ id, level, content }) => (
        <Toast
          key={id}
          id={id}
          level={level}
          onDelete={() => deleteToast(id)}
        >
          {content}
        </Toast>
      ))}
    </Toast.Container>,
    document.body,
  )
}
