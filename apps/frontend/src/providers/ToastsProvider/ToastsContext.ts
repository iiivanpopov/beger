import type { ReactNode } from 'react'
import { createContext } from 'react'

export type ToastLevel = 'info' | 'success' | 'error'

export interface ToastConfig {
  level: ToastLevel
  content: ReactNode
}

export interface ToastEntity extends ToastConfig {
  id: number
}

export interface ToastsContextValue {
  toasts: ToastEntity[]
  createToast: (toast: ToastConfig) => void
  deleteToast: (id: number) => void
}

export const ToastsContext = createContext<ToastsContextValue>(null!)
