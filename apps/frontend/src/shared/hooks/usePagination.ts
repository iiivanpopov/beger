import { useNavigate, useSearch } from '@tanstack/react-router'

export function usePagination(pages: number) {
  const navigate = useNavigate()

  const search = useSearch({ strict: false })
  const page = Number(search.page ?? 1)

  const onNextPage = () => {
    if (page !== pages)
      navigate({ search: (prev: any) => ({ page: prev.page + 1 }) } as any)
  }

  const onPrevPage = () => {
    if (page !== 1)
      navigate({ search: (prev: any) => ({ page: prev.page - 1 }) } as any)
  }

  const onGotoPage = (p: number) => navigate({ search: () => ({ page: p }) } as any)

  return {
    page,
    pages,
    onNextPage,
    onPrevPage,
    onGotoPage,
  }
}
