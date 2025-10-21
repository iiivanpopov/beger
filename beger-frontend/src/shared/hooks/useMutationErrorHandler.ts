import type { HTTPError } from 'ky'
import type { ApiError } from '@/api'
import { useToast } from '@/shared/hooks'
import { extractErrorMessage } from '@/shared/utils'

export function useMutationErrorHandler() {
  const toast = useToast()

  return async (error: HTTPError<ApiError>) => {
    const message = await extractErrorMessage(error)
    toast.error(message)
  }
}
