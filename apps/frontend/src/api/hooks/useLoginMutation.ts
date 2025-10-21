import type { LoginParams } from '@/api/requests/auth'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/requests/auth'

export function useLoginMutation(
  settings?: MutationSettings<LoginParams, typeof login>,
) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: params => login({ params }),
    ...settings?.options,
  })
}
