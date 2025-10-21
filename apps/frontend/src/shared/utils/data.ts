export function matchesSearch(
  search: string,
  fields: string[],
): boolean {
  const normalizedSearch = search.toLowerCase().trim()

  return fields.some(field => field.toString().toLowerCase().includes(normalizedSearch))
}
