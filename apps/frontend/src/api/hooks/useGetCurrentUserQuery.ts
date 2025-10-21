import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getCurrentUser } from '@/api/requests/users'

export function useGetCurrentUserQuery(
  settings?: QuerySettings<typeof getCurrentUser>,
) {
  return useQuery({
    queryKey: ['user', 'self'],
    queryFn: () => getCurrentUser(),
    ...settings?.options,
  })
}
