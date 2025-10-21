import type { Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from 'react'
import clsx from 'clsx'
import { MenuIcon, XIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { buildContext } from '@/shared/utils'
import styles from './Menu.module.css'

export interface MenuContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLDivElement>
}

const [MenuContext, useMenuContext] = buildContext<MenuContextProps>()

export interface MenuProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export function Menu({ children, isOpen, setIsOpen }: MenuProps) {
  const triggerRef = useRef<HTMLDivElement>(null!)

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    triggerRef,
  }), [isOpen, setIsOpen])

  return (
    <MenuContext value={contextValue}>
      {children}
    </MenuContext>
  )
}

export interface MenuTriggerProps {
  children?: ReactNode
  className?: string
}

export function MenuTrigger({ children, className }: MenuTriggerProps) {
  const { setIsOpen, triggerRef } = useMenuContext()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsOpen(true)
    }
    else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div
      ref={triggerRef}
      className={clsx(styles.trigger, className)}
      onClick={() => setIsOpen(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      {children ?? <MenuIcon />}
    </div>
  )
}

export interface MenuContentProps {
  children: ReactNode
  className?: string
}

export function MenuContent({ children, className }: MenuContentProps) {
  const { isOpen, setIsOpen } = useMenuContext()

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

export function MenuRoutes({ children, className }: MenuRouteProps) {
  return <nav className={clsx(styles.routes, className)}>{children}</nav>
}

export interface MenuRouteProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  active?: boolean
}

export function MenuRoute({ children, className, onClick, active }: MenuRouteProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(styles.route, active && styles.active, className)}
    >
      {children}
    </button>
  )
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
Menu.Route = MenuRoute
Menu.Actions = MenuActions
Menu.Action = MenuAction
