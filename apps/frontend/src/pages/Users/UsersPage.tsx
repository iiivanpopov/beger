import { Suspense } from 'react'
import { Typography } from '@/shared/ui'
import { NewUserSection, UsersSection } from './components'
import styles from './UsersPage.module.css'

export function UsersPage() {
  return (
    <div className={styles.page}>
      <NewUserSection />
      <Suspense fallback={<Typography>Loading users...</Typography>}>
        <UsersSection />
      </Suspense>
    </div>
  )
}
