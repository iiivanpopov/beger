import { Link } from '@tanstack/react-router'
import { I18nText } from '@/components'
import { Button, Typography } from '@/shared/ui'
import { Layout } from '@/shared/ui/Layout'
import styles from './ErrorPage.module.css'

export function ErrorPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <Typography variant="heading">
          <I18nText>unexpected.error</I18nText>
        </Typography>
        <Button component={Link} to="/">
          <I18nText>link.home</I18nText>
        </Button>
      </div>
    </Layout>
  )
}
