import type { QuerySettings } from '@/api/types'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getSelfUser } from '@/api/requests/users'

export const useGetSelfUserQueryOptions = queryOptions({
  queryKey: ['getSelfUser'],
  queryFn: () => getSelfUser(),
})

export function useGetSelfUserQuery(
  settings?: QuerySettings<typeof getSelfUser>,
) {
  return useQuery({
    queryKey: ['user', 'self'],
    queryFn: () => getSelfUser({ config: settings?.config }),
    ...settings?.options,
  })
}
