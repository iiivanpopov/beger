import type { build } from 'bun'

export function buildMeta(total: number, page: number, limit: number) {
  const pages = Math.ceil(total / limit)
  const offset = (page - 1) * limit

  return {
    pages,
    page,
    total,
    offset,
    limit,
  }
}

export type PaginationMeta = ReturnType<typeof build>

export function pageToOffset({ page, limit }: { page: number, limit: number }) {
  return (page - 1) * limit
}
