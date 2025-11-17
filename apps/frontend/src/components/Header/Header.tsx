import type { Locale } from '@/providers'
import { Link, useLocation, useNavigate, useRouteContext } from '@tanstack/react-router'
import clsx from 'clsx'
import { DoorOpenIcon, LanguagesIcon } from 'lucide-react'
import { use } from 'react'
import { useLogoutMutation } from '@/api'
import { I18nContext, queryClient } from '@/providers'
import { navigationTabs, storageKeys } from '@/shared/config'
import { useDisclosure, useI18n } from '@/shared/hooks'
import { Button, Dropdown, Menu, Typography } from '@/shared/ui'
import { I18nText } from '../I18nText/I18nText'
import styles from './Header.module.css'

export function Header() {
  const mobileMenu = useDisclosure()
  const { role } = useRouteContext({ from: '__root__' })
  const pathname = useLocation({ select: state => state.pathname })

  const { t } = useI18n()
  const i18n = use(I18nContext)
  const navigate = useNavigate()

  const logoutMutation = useLogoutMutation()

  const onLogout = async () => {
    await logoutMutation.mutateAsync()

    mobileMenu.close()

    localStorage.removeItem(storageKeys.accessToken)
    localStorage.removeItem(storageKeys.refreshToken)

    queryClient.removeQueries({ queryKey: ['getSelfUser'] })

    navigate({ to: '/login', replace: true })
  }

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
              <I18nText>{label}</I18nText>
            </Typography>
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <Dropdown
          value={i18n.locale}
          setValue={locale => i18n.setLocale(locale as Locale)}
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
            aria-label={t('aria-label.logout')}
            color="white"
            onClick={onLogout}
          >
            <DoorOpenIcon />
          </Button>
        )}
      </div>

      <Menu isOpen={mobileMenu.isOpen} setIsOpen={mobileMenu.setIsOpen}>
        <Menu.Trigger className={styles.burger} />
        <Menu.Content className={styles.menu}>
          <Menu.Routes>
            {navigationTabs[role].map(({ to, label }) => (
              <Link key={to} to={to} onClick={() => mobileMenu.close()}>
                <Typography className={clsx(styles.tab, pathname === to && styles.active)}>
                  <I18nText>{label}</I18nText>
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
              <Dropdown.Item value="en">EN</Dropdown.Item>
              <Dropdown.Item value="uk">UK</Dropdown.Item>
              <Dropdown.Item value="ru">RU</Dropdown.Item>
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
