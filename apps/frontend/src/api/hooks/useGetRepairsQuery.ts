import type { GetRepairsParams } from '@/api/requests/repairs'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getRepairs } from '@/api/requests/repairs'

export function useGetRepairsQuery(
  params?: GetRepairsParams,
  settings?: QuerySettings<typeof getRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'all', params],
    queryFn: () => getRepairs({ params }),
    ...settings?.options,
  })
}
