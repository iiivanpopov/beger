import type { ComponentProps, Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import clsx from 'clsx'
import { MenuIcon, XIcon } from 'lucide-react'
import { createContext, use, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useControllableState, useI18n } from '@/shared/hooks'
import { cloneComponent } from '@/shared/utils'
import styles from './Menu.module.css'

export interface MenuContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLButtonElement>
}

const MenuContext = createContext<MenuContextProps>(null!)

export type MenuProps = {
  children: ReactNode
}
& ({ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
  | { isOpen?: never, setIsOpen?: never })

export function Menu({ children, isOpen, setIsOpen }: MenuProps) {
  const [internalIsOpen, internalSetIsOpen] = useControllableState([isOpen, setIsOpen], false)
  const triggerRef = useRef<HTMLButtonElement>(null!)

  const contextValue = useMemo(() => ({
    isOpen: internalIsOpen,
    setIsOpen: internalSetIsOpen,
    triggerRef,
  }), [internalIsOpen, internalSetIsOpen])

  return (
    <MenuContext value={contextValue}>
      {children}
    </MenuContext>
  )
}

export interface MenuTriggerProps extends ComponentProps<'button'> {
  children?: ReactNode
  className?: string
  asChild?: boolean
}

export function MenuTrigger({ children, className, asChild = false, ...props }: MenuTriggerProps) {
  const { setIsOpen, triggerRef } = use(MenuContext)
  const { t } = useI18n()

  const onClick = () => setIsOpen(true)

  if (asChild) {
    return cloneComponent(children, {
      'ref': triggerRef,
      'aria-label': t('aria-label.open-menu'),
      'title': t('aria-label.open-menu'),
      'onClick': onClick,
    })
  }

  return (
    <button
      {...props}
      type="button"
      aria-label={t('aria-label.open-menu')}
      title={t('aria-label.open-menu')}
      ref={triggerRef}
      className={clsx(styles.trigger, className)}
      onClick={onClick}
    >
      {children ?? <MenuIcon />}
    </button>
  )
}

export interface MenuContentProps {
  children: ReactNode
  className?: string
}

export function MenuContent({ children, className }: MenuContentProps) {
  const { isOpen, setIsOpen } = use(MenuContext)

  if (!isOpen)
    return null

  return createPortal(
    <div className={clsx(styles.content, className)}>
      <button
        type="button"
        className={styles.close}
        onClick={() => setIsOpen(false)}
      >
        <XIcon />
      </button>
      {children}
    </div>,
    document.body,
  )
}

export interface MenuRoutesProps {
  children: ReactNode
  className?: string
}

export function MenuRoutes({ children, className }: MenuRoutesProps) {
  return <nav className={clsx(styles.routes, className)}>{children}</nav>
}

export interface MenuActionsProps {
  children: ReactNode
  className?: string
}

export function MenuActions({ children, className }: MenuActionsProps) {
  return <div className={clsx(styles.actions, className)}>{children}</div>
}

export interface MenuActionProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function MenuAction({ children, onClick, className }: MenuActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.action, className)}
    >
      {children}
    </button>
  )
}

Menu.Trigger = MenuTrigger
Menu.Content = MenuContent
Menu.Routes = MenuRoutes
Menu.Actions = MenuActions
Menu.Action = MenuAction
