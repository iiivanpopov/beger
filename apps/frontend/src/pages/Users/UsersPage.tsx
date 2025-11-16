import { Suspense } from 'react'
import { I18nText } from '@/components'
import { Typography } from '@/shared/ui'
import { NewUserSection, UsersSection } from './components'
import styles from './UsersPage.module.css'

export function UsersPage() {
  return (
    <div className={styles.page}>
      <NewUserSection />
      <Suspense fallback={<Typography><I18nText>message.loading-users</I18nText></Typography>}>
        <UsersSection />
      </Suspense>
    </div>
  )
}
