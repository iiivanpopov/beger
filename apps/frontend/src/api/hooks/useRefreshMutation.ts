import type { RefreshParams } from '@/api/requests/auth'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { refresh } from '@/api/requests/auth'

export function useRefreshMutation(
  settings?: MutationSettings<RefreshParams, typeof refresh>,
) {
  return useMutation({
    mutationKey: ['refresh'],
    mutationFn: params => refresh({ params }),
    ...settings?.options,
  })
}
