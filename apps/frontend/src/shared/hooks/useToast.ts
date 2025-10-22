import { use } from 'react'
import { ToastsContext } from '@/providers/ToastsProvider'

export function useToast() {
  const { createToast } = use(ToastsContext)

  return {
    info: (message: string, { delay = 3000, icon = true } = {}) => createToast('info', message, { delay, icon }),
    success: (message: string, { delay = 3000, icon = true } = {}) => createToast('success', message, { delay, icon }),
    error: (message: string, { delay = 3000, icon = true } = {}) => createToast('error', message, { delay, icon }),
  }
}
