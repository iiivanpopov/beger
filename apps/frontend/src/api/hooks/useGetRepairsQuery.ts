import type { GetRepairsPayload, QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getRepairs } from '@/api/requests/repairs'

export function useGetRepairsQuery(
  payload: GetRepairsPayload,
  settings?: QuerySettings<typeof getRepairs>,
) {
  return useQuery({
    queryKey: ['repairs', 'all', payload],
    queryFn: () => getRepairs({ payload, config: settings?.config }),
    ...settings?.options,
  })
}
