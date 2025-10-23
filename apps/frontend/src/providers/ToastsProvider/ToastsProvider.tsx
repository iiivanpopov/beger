import type { ReactNode } from 'react'
import type { ToastEntity, ToastType } from '@/shared/ui'
import { useCallback, useMemo, useState } from 'react'
import { ToastsContainer } from '@/shared/ui'
import { ToastsContext } from './ToastsContext'

export interface ToastsProviderProps {
  children: ReactNode
}

export function ToastsProvider({ children }: ToastsProviderProps) {
  const [toasts, setToasts] = useState<ToastEntity[]>([])

  const createToast = useCallback((
    type: ToastType = 'info',
    message: string,
    { delay = 3000, icon = true },
  ) => {
    setToasts(prev => [...prev, { id: Date.now() * Math.random(), message, delay, type, icon }])
  }, [])

  const deleteToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const contextValue = useMemo(() => ({
    toasts,
    createToast,
    deleteToast,
  }), [createToast, deleteToast, toasts])

  return (
    <ToastsContext value={contextValue}>
      {children}
      <ToastsContainer toasts={toasts} deleteToast={deleteToast} />
    </ToastsContext>
  )
}
