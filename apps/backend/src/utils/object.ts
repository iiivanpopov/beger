export function groupBy<T extends Record<string, string>>(rows: T[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {}

  for (const row of rows) {
    for (const [key, value] of Object.entries(row)) {
      ;(grouped[key] ??= []).push(value)
    }
  }

  return grouped
}
