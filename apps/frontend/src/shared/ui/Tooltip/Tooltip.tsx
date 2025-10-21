import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'
import clsx from 'clsx'
import { createContext, use, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useFloatingPosition } from '@/shared/hooks'
import styles from './Tooltip.module.css'

export interface TooltipContextProps {
  triggerRef: RefObject<HTMLDivElement>
  contentRef: RefObject<HTMLDivElement>
  isShown: boolean
  setIsShown: Dispatch<SetStateAction<boolean>>
}

const TooltipContext = createContext<TooltipContextProps>(null!)

export interface TooltipProps {
  children: ReactNode
}

export function Tooltip({ children }: TooltipProps) {
  const triggerRef = useRef<HTMLDivElement>(null!)
  const contentRef = useRef<HTMLDivElement>(null!)
  const [isShown, setIsShown] = useState(false)

  const contextValue = useMemo(() => ({
    triggerRef,
    contentRef,
    isShown,
    setIsShown,
  }), [isShown])

  return <TooltipContext value={contextValue}>{children}</TooltipContext>
}

export interface TooltipTriggerProps {
  children: ReactNode
  className?: string
}

export function TooltipTrigger({ children, className }: TooltipTriggerProps) {
  const { triggerRef, setIsShown } = use(TooltipContext)

  return (
    <div
      ref={triggerRef}
      onMouseOver={() => setIsShown(true)}
      onFocus={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      className={className}
    >
      {children}
    </div>
  )
}

export interface TooltipContentProps {
  className?: string
  children: ReactNode
}

export function TooltipContent({ className, children }: TooltipContentProps) {
  const { contentRef, isShown, triggerRef, setIsShown } = use(TooltipContext)

  useFloatingPosition(triggerRef, contentRef, {
    x: 0,
    y: 8,
  }, !isShown)

  if (!isShown)
    return null

  return createPortal(
    <div
      ref={contentRef}
      className={clsx(styles.content, className)}
      onMouseOver={() => setIsShown(true)}
      onFocus={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
    >
      {children}
    </div>,
    document.body,
  )
}

Tooltip.Trigger = TooltipTrigger
Tooltip.Content = TooltipContent
