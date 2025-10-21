import { useNavigate, useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'

export function usePagination({ pages }: { pages?: number }) {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const page = Number(search.page ?? 1)
  const totalPages = pages ?? 1

  const nextDisabled = useMemo(() => page >= totalPages, [page, totalPages])
  const prevDisabled = useMemo(() => page <= 1, [page])

  const onNextPage = () => {
    if (nextDisabled)
      return
    navigate({ search: (prev: any) => ({ page: prev.page + 1 }) } as any)
  }

  const onPrevPage = () => {
    if (prevDisabled)
      return
    navigate({ search: (prev: any) => ({ page: prev.page - 1 }) } as any)
  }

  const onGotoPage = (p: number) => navigate({ search: () => ({ page: p }) } as any)

  const availablePrev = useMemo(() => {
    const start = Math.max(1, page - 3)
    return Array.from({ length: page - start }, (_, i) => start + i)
  }, [page])

  const availableNext = useMemo(() => {
    const end = Math.min(totalPages, page + 3)
    return Array.from({ length: end - page }, (_, i) => page + i + 1)
  }, [page, totalPages])

  return {
    page,
    pages: totalPages,
    nextDisabled,
    prevDisabled,
    availablePrev,
    availableNext,
    onNextPage,
    onPrevPage,
    onGotoPage,
  }
}
