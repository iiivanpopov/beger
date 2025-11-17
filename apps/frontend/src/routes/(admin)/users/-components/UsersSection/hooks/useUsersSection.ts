import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { getUsersQueryOptions, useDeleteUserMutation } from '@/api'
import { queryClient } from '@/providers'
import { useI18n, useMutationErrorHandler, usePagination, useToast } from '@/shared/hooks'

export function useUsersSection() {
  const search = useSearch({ from: '/(admin)/users' })

  const usersQuery = useSuspenseQuery(getUsersQueryOptions({ query: { limit: 5, page: search.page } }))

  const pagination = usePagination(usersQuery.data.data.meta.pages)

  const { t } = useI18n()
  const toast = useToast()
  const mutationHandler = useMutationErrorHandler()

  const deleteUserMutation = useDeleteUserMutation({
    options: {
      onError: mutationHandler,
    },
  })

  const onDelete = async (id: number) => {
    await deleteUserMutation.mutateAsync({ payload: { params: { id } } })
    toast.success(t('message.deleted-user'))
    queryClient.invalidateQueries({ queryKey: ['getUsers'] })
  }

  return {
    state: {
      pagination,
      search,
    },
    queries: {
      users: usersQuery,
    },
    actions: {
      onDelete,
    },
  }
}
