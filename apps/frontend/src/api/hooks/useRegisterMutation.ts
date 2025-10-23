import type { RegisterConfig } from '@/api/requests/auth'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { register } from '@/api/requests/auth'

export function useRegisterMutation(
  settings?: MutationSettings<RegisterConfig, typeof register>,
) {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: ({ payload, config }) => register({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
