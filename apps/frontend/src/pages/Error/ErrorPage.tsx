import { Typography } from '@/shared/ui'
import styles from './ErrorPage.module.css'

export function ErrorPage() {
  return (
    <div className={styles.page}>
      <Typography tag="h1" variant="heading">Unexpected error happened...</Typography>
    </div>
  )
}
