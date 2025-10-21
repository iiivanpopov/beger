import { DoorOpenIcon } from 'lucide-react'
import { Button, Menu, Typography } from '@/shared/ui'
import { NavLinks } from '../NavLinks'
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
        <NavLinks role={data.role} pathname={data.pathname} />
      </nav>

      <div className={styles.actions}>
        {data.role !== 'guest' && (
          <Button icon color="white" onClick={actions.onLogout}>
            <DoorOpenIcon />
          </Button>
        )}
      </div>

      <Menu isOpen={ui.menu.isOpen} setIsOpen={ui.menu.setIsOpen}>
        <Menu.Trigger className={styles.burger} />
        <Menu.Content className={styles.menu}>
          <Menu.Routes>
            <NavLinks
              role={data.role}
              pathname={data.pathname}
              onClick={() => ui.menu.setIsOpen(false)}
            />
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
