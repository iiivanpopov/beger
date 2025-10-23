import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext, useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getUsersQueryOptions, useDeleteUserMutation } from '@/api'
import { useMutationErrorHandler, usePagination, useToast } from '@/shared/hooks'
import { Typography } from '@/shared/ui'
import { UserCard } from './UserCard'
import styles from './UsersSection.module.css'

export function UsersSection() {
  const { queryClient } = useRouteContext({ from: '__root__' })
  const search = useSearch({ from: '/(admin)/users' })

  const usersQuery = useSuspenseQuery(getUsersQueryOptions({ query: { limit: 5, page: search.page } }))

  const pagination = usePagination(usersQuery.data.data.meta.pages)
  const mutationHandler = useMutationErrorHandler()
  const toast = useToast()

  const deleteUserMutation = useDeleteUserMutation({
    options: {
      onSuccess: () => {
        toast.success('Deleted user')
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
      },
      onError: mutationHandler,
    },
  })

  const onDelete = (id: number) => deleteUserMutation.mutate({ payload: { params: { id } } })

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Users</Typography>
        <div className={styles.pagination}>
          <div>
            <button
              type="button"
              aria-label="previous page"
              title="previous page"
              hidden={search.page === 1 || pagination.pages === 0}
              onClick={pagination.onPrevPage}
            >
              <ArrowLeftIcon />
            </button>
          </div>

          <div>
            <span
              aria-label="current page"
              hidden={pagination.pages === 1 || pagination.pages === 0}
            >
              {search.page}
            </span>
          </div>

          <div>
            <button
              type="button"
              aria-label="next page"
              title="next page"
              hidden={search.page === pagination.pages || pagination.pages === 0}
              onClick={pagination.onNextPage}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.users}>
        {!usersQuery.data.data?.users.length && <Typography>No users found...</Typography>}
        {usersQuery.data.data?.users.map((user, i) => (
          <UserCard
            onDelete={onDelete}
            key={user.id}
            user={user}
            i={i + 1}
          />
        ))}
      </div>
    </section>
  )
}
