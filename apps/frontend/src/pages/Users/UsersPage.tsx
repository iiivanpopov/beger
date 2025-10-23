import { Suspense } from 'react'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@/shared/ui'
import { NewUserSection, UsersSection } from './components'
import styles from './UsersPage.module.css'

export function UsersPage() {
  return (
    <div className={styles.page}>
      <NewUserSection />
      <Suspense fallback={<Typography><FormattedMessage id="message.loading-users" /></Typography>}>
        <UsersSection />
      </Suspense>
    </div>
  )
}
