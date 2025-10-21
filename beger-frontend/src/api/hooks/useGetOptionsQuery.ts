import type { QuerySettings } from '@/api/types'
import { useQuery } from '@tanstack/react-query'
import { getOptions } from '@/api/requests/options'

export function useGetOptionsQuery(
  settings?: QuerySettings<typeof getOptions>,
) {
  return useQuery({
    queryKey: ['options'],
    queryFn: () => getOptions(),
    ...settings?.options,
  })
}
