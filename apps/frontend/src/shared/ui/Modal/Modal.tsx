import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import { createContext, use, useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOn, useControllableState } from '@/shared/hooks'
import { cloneComponent } from '@/shared/utils'
import styles from './Modal.module.css'

export interface ModalContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLButtonElement>
}

const ModalContext = createContext<ModalContextProps>(null!)

export type ModalProps = {
  children: ReactNode
}
& ({ isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }
  | { isOpen?: never, setIsOpen?: never })

export function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const [internalIsOpen, internalSetIsOpen] = useControllableState([isOpen, setIsOpen], false)

  const triggerRef = useRef<HTMLButtonElement>(null!)

  const contextValue = useMemo(() => ({
    isOpen: internalIsOpen,
    setIsOpen: internalSetIsOpen,
    triggerRef,
  }), [internalIsOpen, internalSetIsOpen])

  return (
    <ModalContext value={contextValue}>
      {children}
    </ModalContext>
  )
}

export interface ModalTriggerProps {
  children: ReactNode
  className?: string
  asChild?: boolean
}

export function ModalTrigger({ children, className, asChild = false }: ModalTriggerProps) {
  const { setIsOpen, triggerRef } = use(ModalContext)

  const onClick = () => setIsOpen(true)

  if (asChild) {
    return cloneComponent(children, {
      ref: triggerRef,
      onClick,
    })
  }

  return (
    <button
      type="button"
      ref={triggerRef}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export interface ModalContentProps {
  children: ReactNode
  className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
  const { isOpen, setIsOpen } = use(ModalContext)
  const registerRef = useClickOn(() => setIsOpen(false))

  if (!isOpen)
    return null

  return createPortal(
    <div
      className={styles.backdrop}
      ref={registerRef}
    >
      <div className={clsx(styles.content, className)}>
        {children}
      </div>
    </div>,
    document.body,
  )
}

export interface ModalHeaderProps {
  children: ReactNode
  className?: string
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  const { setIsOpen } = use(ModalContext)

  return (
    <div className={clsx(styles.header, className)}>
      {children}
      <button
        type="button"
        className={styles.close}
        onClick={() => setIsOpen(false)}
      >
        <XIcon />
      </button>
    </div>
  )
}

Modal.Trigger = ModalTrigger
Modal.Content = ModalContent
Modal.Header = ModalHeader
