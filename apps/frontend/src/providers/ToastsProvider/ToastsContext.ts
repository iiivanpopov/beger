import type { ToastType } from '@/shared/ui'
import { createContext } from 'react'

export interface ToastConfig {
  type: ToastType
  message: string
  delay: number
  icon: boolean
}

export interface ToastEntity extends ToastConfig {
  id: number
}

export interface ToastsContextValue {
  toasts: ToastEntity[]
  createToast: (
    type: ToastType,
    message: string,
    { delay, icon }: { delay: number, icon: boolean },
  ) => void
  deleteToast: (id: number) => void
}

export const ToastsContext = createContext<ToastsContextValue>(null!)
