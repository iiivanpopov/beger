import type { LoginConfig } from '@/api/requests/auth'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/requests/auth'

export function useLoginMutation(
  settings?: MutationSettings<LoginConfig, typeof login>,
) {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: ({ payload, config }) => login({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
