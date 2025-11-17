import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getSelfTestResults } from '@/api/requests/test-results'

export function useGetSelfTestResultsQuery(
  settings?: QuerySettings<typeof getSelfTestResults>,
) {
  return useQuery({
    queryKey: ['getSelfTestResults'],
    queryFn: () => getSelfTestResults({ config: settings?.config }),
    ...settings?.options,
  })
}
