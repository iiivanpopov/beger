import type { GetUsersPayload, QuerySettings } from '@/api/types'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getUsers } from '@/api/requests/users'

export function getUsersQueryOptions(payload: GetUsersPayload) {
  return queryOptions({
    queryKey: ['users', 'all', payload],
    queryFn: () => getUsers({ payload }),
  })
}

export function useGetUsersQuery(
  payload: GetUsersPayload,
  settings?: QuerySettings<typeof getUsers>,
) {
  return useQuery({
    queryKey: ['users', 'all', payload],
    queryFn: () => getUsers({ payload, config: settings?.config }),
    ...settings?.options,
  })
}
