import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <span className={styles.code}>404</span>
      <span className={styles.notFound}>Not found</span>
    </div>
  )
}
