import { Link } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon } from 'lucide-react'
import { navigationTabs } from '@/shared/config'
import { Button, Menu, Typography } from '@/shared/ui'
import styles from './Header.module.css'
import { useHeader } from './hooks/useHeader'

export function Header() {
  const { actions, data, ui } = useHeader()

  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.icon} />
        <Typography variant="heading" tag="h1" className={styles.title}>Beger</Typography>
      </div>

      <nav className={styles.tabs}>
        {navigationTabs[data.role].map(({ to, label }) => (
          <Link key={to} to={to}>
            <Typography className={clsx(styles.tab, data.pathname === to && styles.active)}>
              {label}
            </Typography>
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        {data.role !== 'guest' && (
          <Button icon aria-label="logout" color="white" onClick={actions.onLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>

      <Menu isOpen={ui.menu.isOpen} setIsOpen={ui.menu.setIsOpen}>
        <Menu.Trigger className={styles.burger} />
        <Menu.Content className={styles.menu}>
          <Menu.Routes>
            {navigationTabs[data.role].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => ui.menu.setIsOpen(false)}>
                <Typography className={clsx(styles.tab, data.pathname === to && styles.active)}>
                  {label}
                </Typography>
              </Link>
            ))}
          </Menu.Routes>
          {data.role !== 'guest' && (
            <Menu.Actions>
              <Menu.Action onClick={actions.onLogout}>
                <DoorOpenIcon />
              </Menu.Action>
            </Menu.Actions>
          )}
        </Menu.Content>
      </Menu>
    </header>
  )
}
