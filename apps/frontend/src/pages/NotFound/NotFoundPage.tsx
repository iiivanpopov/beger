import { FormattedMessage } from 'react-intl'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <h1>404</h1>
      <h2><FormattedMessage id="not-found" /></h2>
    </div>
  )
}
