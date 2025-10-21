import type { GetUsersParams } from '@/api/requests/users'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/requests/users'

export function useGetUsersQuery(
  params: GetUsersParams,
  settings?: QuerySettings<typeof getUsers>,
) {
  return useQuery({
    queryKey: ['users', 'all', params],
    queryFn: () => getUsers({ params }),
    ...settings?.options,
  })
}
