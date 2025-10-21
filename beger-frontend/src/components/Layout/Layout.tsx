import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import styles from './Layout.module.css'

export interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
