import type { ToastEntity, ToastType } from '@/shared/ui'
import { createContext } from 'react'

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
