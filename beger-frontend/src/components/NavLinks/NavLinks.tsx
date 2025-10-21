import type { UserRole } from '@/api'
import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { navigationTabs } from '@/shared/config'
import { Typography } from '@/shared/ui'
import styles from './NavLinks.module.css'

export function NavLinks({ role, pathname, onClick }: {
  role: UserRole
  pathname: string
  onClick?: () => void
}) {
  return navigationTabs[role].map(({ to, label }) => (
    <Link key={to} to={to} onClick={onClick}>
      <Typography className={clsx(styles.tab, pathname === to && styles.active)}>
        {label}
      </Typography>
    </Link>
  ))
}
