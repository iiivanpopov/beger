import type { Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from 'react'
import clsx from 'clsx'
import { XIcon } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOn } from '@/shared/hooks'
import { buildContext } from '@/shared/utils'
import styles from './Modal.module.css'

export interface ModalContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLDivElement>
}

const [ModalContext, useModalContext] = buildContext<ModalContextProps>()

export interface ModalProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export function Modal({ children, isOpen, setIsOpen }: ModalProps) {
  const triggerRef = useRef<HTMLDivElement>(null!)

  const contextValue = useMemo(() => ({
    isOpen,
    setIsOpen,
    triggerRef,
  }), [isOpen, setIsOpen])

  return (
    <ModalContext value={contextValue}>
      {children}
    </ModalContext>
  )
}

export interface ModalTriggerProps {
  children: ReactNode
  className?: string
}

export function ModalTrigger({ children, className }: ModalTriggerProps) {
  const { setIsOpen, triggerRef } = useModalContext()

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
      className={className}
      onClick={() => setIsOpen(true)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
    >
      {children}
    </div>
  )
}

export interface ModalContentProps {
  children: ReactNode
  className?: string
}

export function ModalContent({ children, className }: ModalContentProps) {
  const { isOpen, setIsOpen } = useModalContext()
  const register = useClickOn(() => setIsOpen(false))

  if (!isOpen)
    return null

  return createPortal(
    <div
      className={styles.backdrop}
      ref={register}
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
  const { setIsOpen } = useModalContext()

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
