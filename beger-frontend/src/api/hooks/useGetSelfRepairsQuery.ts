import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getSelfRepairs } from '@/api/requests/repairs'

export function useGetSelfRepairsQuery(
  settings?: QuerySettings<typeof getSelfRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'self'],
    queryFn: () => getSelfRepairs(),
    ...settings?.options,
  })
}
