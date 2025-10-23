import type { Locale } from '@/providers'
import { Link, useLocation, useNavigate, useRouteContext } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon, LanguagesIcon } from 'lucide-react'
import { use, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useLogoutMutation } from '@/api'
import { I18nContext } from '@/providers'
import { navigationTabs, storageKeys } from '@/shared/config'
import { Button, Dropdown, Menu, Typography } from '@/shared/ui'
import styles from './Header.module.css'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = useLocation({ select: state => state.pathname })
  const navigate = useNavigate()
  const { queryClient, role } = useRouteContext({ from: '__root__' })
  const intl = useIntl()
  const i18n = use(I18nContext)

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
              <FormattedMessage id={label} />
            </Typography>
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <Dropdown
          value={i18n.locale}
          onChange={locale => i18n.setLocale(locale as Locale)}
          defaultIcon={LanguagesIcon}
        >
          <Dropdown.Trigger />
          <Dropdown.Items>
            <Dropdown.Item icon={LanguagesIcon} value="en">EN</Dropdown.Item>
            <Dropdown.Item icon={LanguagesIcon} value="uk">UK</Dropdown.Item>
            <Dropdown.Item icon={LanguagesIcon} value="ru">RU</Dropdown.Item>
          </Dropdown.Items>
        </Dropdown>
        {role !== 'guest' && (
          <Button
            icon
            aria-label={intl.formatMessage({ id: 'aria-label.logout' })}
            color="white"
            onClick={onLogout}
          >
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
                  <FormattedMessage id={label} />
                </Typography>
              </Link>
            ))}
          </Menu.Routes>
          <Dropdown
            value={i18n.locale}
            onChange={locale => i18n.setLocale(locale as Locale)}
            defaultIcon={LanguagesIcon}
          >
            <Dropdown.Trigger />
            <Dropdown.Items>
              <Dropdown.Item icon={LanguagesIcon} value="en">EN</Dropdown.Item>
              <Dropdown.Item icon={LanguagesIcon} value="uk">UK</Dropdown.Item>
              <Dropdown.Item icon={LanguagesIcon} value="ru">RU</Dropdown.Item>
            </Dropdown.Items>
          </Dropdown>

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
