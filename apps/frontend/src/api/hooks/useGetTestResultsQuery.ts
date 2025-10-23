import type { GetTestResultsPayload, QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getTestResults } from '@/api/requests/test-results'

export function useGetTestResultsQuery(
  payload: GetTestResultsPayload,
  settings?: QuerySettings<typeof getTestResults>,
) {
  return useQuery({
    queryKey: ['test-results', 'all', payload],
    queryFn: () => getTestResults({ payload, config: settings?.config }),
    ...settings?.options,
  })
}
