import type { GetUsersParams } from '@/api/requests/users'
import type { QuerySettings } from '@/api/types'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/requests/users'

export function getUsersQueryOptions(params: GetUsersParams) {
  return queryOptions({
    queryKey: ['users', 'all', params],
    queryFn: () => getUsers({ params }),
  })
}

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
