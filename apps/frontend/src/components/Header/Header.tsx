import { Link, useLocation, useNavigate, useRouteContext } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon } from 'lucide-react'
import { useState } from 'react'
import { useLogoutMutation } from '@/api'
import { navigationTabs, storageKeys } from '@/shared/config'
import { Button, Menu, Typography } from '@/shared/ui'
import styles from './Header.module.css'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = useLocation({ select: state => state.pathname })
  const navigate = useNavigate()
  const { queryClient, role } = useRouteContext({ from: '__root__' })

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        setIsOpen(false)
        localStorage.removeItem(storageKeys.accessToken)
        localStorage.removeItem(storageKeys.refreshToken)
        queryClient.removeQueries({ queryKey: ['user', 'self'] })
        navigate({ to: '/login', replace: true })
      },
    },
  })

  const onLogout = () => logoutMutation.mutate()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.icon} />
        <Typography variant="heading" tag="h1" className={styles.title}>Beger</Typography>
      </div>

      <nav className={styles.tabs}>
        {navigationTabs[role].map(({ to, label }) => (
          <Link key={to} to={to}>
            <Typography className={clsx(styles.tab, pathname === to && styles.active)}>
              {label}
            </Typography>
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        {role !== 'guest' && (
          <Button icon aria-label="logout" color="white" onClick={onLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>

      <Menu isOpen={isOpen} setIsOpen={setIsOpen}>
        <Menu.Trigger className={styles.burger} />
        <Menu.Content className={styles.menu}>
          <Menu.Routes>
            {navigationTabs[role].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => setIsOpen(false)}>
                <Typography className={clsx(styles.tab, pathname === to && styles.active)}>
                  {label}
                </Typography>
              </Link>
            ))}
          </Menu.Routes>
          {role !== 'guest' && (
            <Menu.Actions>
              <Menu.Action onClick={onLogout}>
                <DoorOpenIcon />
              </Menu.Action>
            </Menu.Actions>
          )}
        </Menu.Content>
      </Menu>
    </header>
  )
}
