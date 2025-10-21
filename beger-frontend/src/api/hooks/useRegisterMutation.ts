import type { RegisterParams } from '@/api/requests/auth'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/api/requests/auth'

export function useRegisterMutation(
  settings?: MutationSettings<RegisterParams, typeof register>,
) {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: params => register({ params }),
    ...settings?.options,
  })
}
