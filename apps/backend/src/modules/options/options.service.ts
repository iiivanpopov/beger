import { config } from '@/config'
import { groupBy, parseCsvRows, withCache } from '@/utils'

export function fetchOptions() {
  return withCache(
    config.cache.options.key,
    async () => {
      const response = await fetch(config.options.sheetUrl)
      const text = await response.text()

      const rows = parseCsvRows(text)

      return groupBy(rows)
    },
    config.cache.options.ttl,
  )
}
