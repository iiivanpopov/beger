import type { ReactNode } from 'react'
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react'
import { use } from 'react'
import { ToastsContext } from '@/providers/ToastsProvider'

export function useToast() {
  const { createToast } = use(ToastsContext)

  const info = (content: ReactNode) => createToast({
    level: 'info',
    content: <>
      <InfoIcon />
      {content}
    </>,
  })

  const success = (content: ReactNode) => createToast({
    level: 'success',
    content: <>
      <CheckCircleIcon />
      {content}
    </>,
  })

  const error = (content: ReactNode) => createToast({
    level: 'error',
    content: <>
      <TriangleAlertIcon />
      {content}
    </>,
  })

  return { info, success, error }
}
