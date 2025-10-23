import { Link } from '@tanstack/react-router'
import { Button } from '@/shared/ui'
import { Layout } from '@/shared/ui/Layout'
import styles from './ErrorPage.module.css'

export function ErrorPage() {
  return (
    <Layout>
      <div className={styles.page}>
        <span>Unexpected error happened...</span>
        <Link to="/"><Button>Home</Button></Link>
      </div>
    </Layout>
  )
}
