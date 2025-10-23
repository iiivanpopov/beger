import type { UpdateUserConfig } from '@/api/requests/users'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/api/requests/users'

export function useUpdateUserMutation(
  settings?: MutationSettings<UpdateUserConfig, typeof updateUser>,
) {
  return useMutation({
    mutationKey: ['updateUser'],
    mutationFn: ({ payload, config }) => updateUser({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
