import { Link } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { Button } from '@/shared/ui'
import { Layout } from '@/shared/ui/Layout'
import styles from './ErrorPage.module.css'

export function ErrorPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <span><FormattedMessage id="unexpected-error" /></span>
        <Link to="/"><Button><FormattedMessage id="link.home" /></Button></Link>
      </div>
    </Layout>
  )
}
