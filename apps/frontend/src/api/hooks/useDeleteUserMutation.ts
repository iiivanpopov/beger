import type { DeleteUserParams } from '@/api/requests/users'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteUser } from '@/api/requests/users'

export function useDeleteUserMutation(
  settings?: MutationSettings<DeleteUserParams, typeof deleteUser>,
) {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: params => deleteUser({ params }),
    ...settings?.options,
  })
}
