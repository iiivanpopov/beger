import type { ComponentProps, Dispatch, KeyboardEvent, ReactNode, RefObject, SetStateAction } from 'react'
import type { ClickEvent } from '@/shared/types'
import clsx from 'clsx'
import { useMemo, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useClickOutside, useFloatingPosition } from '@/shared/hooks'
import { buildContext } from '@/shared/utils'
import styles from './Popover.module.css'

export interface PopoverContextProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  triggerRef: RefObject<HTMLDivElement>
  contentRef: RefObject<HTMLDivElement>
}

const [PopoverContext, usePopoverContext] = buildContext<PopoverContextProps>()

export interface PopoverProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  children: ReactNode
}

export function Popover({ children, isOpen, setIsOpen }: PopoverProps) {
  const triggerRef = useRef<HTMLDivElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)

  const contextValue = useMemo(
    () => ({
      isOpen,
      setIsOpen,
      triggerRef,
      contentRef,
    }),
    [isOpen, setIsOpen],
  )

  return <PopoverContext value={contextValue}>{children}</PopoverContext>
}

export interface PopoverTriggerProps extends ComponentProps<'button'> {}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  const { isOpen, setIsOpen, triggerRef } = usePopoverContext()

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(true)
    }
    else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div
      className={className}
      role="button"
      ref={triggerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onClick={() => setIsOpen(true)}
      aria-expanded={isOpen}
    >
      {children}
    </div>
  )
}

type PopoverContentProps = ComponentProps<'div'>

export function PopoverContent({ children, className, ...props }: PopoverContentProps) {
  const { contentRef, triggerRef, setIsOpen, isOpen } = usePopoverContext()

  useClickOutside((e: ClickEvent) => {
    const target = e.target as Node
    if (!triggerRef.current?.contains(target)) {
      setIsOpen(false)
    }
  }, contentRef)

  useFloatingPosition(triggerRef, contentRef, {
    y: 6,
    x: 0,
  }, !isOpen)

  if (!isOpen)
    return null

  return createPortal(
    <div {...props} ref={contentRef} className={clsx(styles.content, className)}>
      {children}
    </div>,
    document.body,
  )
}

Popover.Trigger = PopoverTrigger
Popover.Content = PopoverContent
