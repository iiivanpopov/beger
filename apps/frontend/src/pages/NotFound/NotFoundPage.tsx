import { I18nText } from '@/components'
import { Typography } from '@/shared/ui'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={styles.page}>
      <Typography variant="heading">404</Typography>
      <Typography variant="subheading">
        <I18nText> not-found</I18nText>
      </Typography>
    </div>
  )
}
