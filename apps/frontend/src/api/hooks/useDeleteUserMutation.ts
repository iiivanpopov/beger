import type { DeleteUserConfig } from '@/api/requests/users'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '@/api/requests/users'

export function useDeleteUserMutation(
  settings?: MutationSettings<DeleteUserConfig, typeof deleteUser>,
) {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: ({ payload, config }) => deleteUser({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
