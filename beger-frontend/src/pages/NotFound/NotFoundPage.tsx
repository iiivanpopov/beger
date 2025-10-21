import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.section}>
      <span className={styles.code}>404</span>
      <span className={styles.notFound}>Not found</span>
    </section>
  )
}
