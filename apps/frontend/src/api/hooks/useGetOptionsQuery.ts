import type { QuerySettings } from '@/api/types'
import { queryOptions, useQuery } from '@tanstack/react-query'
import { getOptions } from '@/api/requests/options'

export const getOptionsQueryOptions = queryOptions({
  queryKey: ['getOptions'],
  queryFn: () => getOptions(),
})

export function useGetOptionsQuery(
  settings?: QuerySettings<typeof getOptions>,
) {
  return useQuery({
    queryKey: ['getOptions'],
    queryFn: () => getOptions({ config: settings?.config }),
    ...settings?.options,
  })
}
