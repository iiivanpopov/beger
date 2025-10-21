import type { ReactNode } from 'react'
import type { ToastConfig, ToastEntity } from './ToastsContext'
import { useCallback, useMemo, useState } from 'react'
import { ToastsContext } from './ToastsContext'

export interface ToastsProviderProps {
  children: ReactNode
}

export function ToastsProvider({ children }: ToastsProviderProps) {
  const [toasts, setToasts] = useState<ToastEntity[]>([])

  const createToast = useCallback((toast: ToastConfig) => {
    setToasts(prev => [...prev, {
      id: Date.now() * Math.random(),
      content: toast.content,
      level: toast.level,
    }])
  }, [])

  const deleteToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const contextValue = useMemo(() => ({
    toasts,
    createToast,
    deleteToast,
  }), [createToast, deleteToast, toasts])

  return <ToastsContext value={contextValue}>{children}</ToastsContext>
}
