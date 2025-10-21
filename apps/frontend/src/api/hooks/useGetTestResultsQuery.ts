import type { GetTestResultsParams } from '@/api/requests/test-results'
import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getTestResults } from '@/api/requests/test-results'

export function useGetTestResultsQuery(
  params?: GetTestResultsParams,
  settings?: QuerySettings<typeof getTestResults>,
) {
  return useQuery({
    queryKey: ['test-results', 'all', params],
    queryFn: () => getTestResults({ params }),
    ...settings?.options,
  })
}
