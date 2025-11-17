import { useSuspenseQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { getUsersQueryOptions, useDeleteUserMutation } from '@/api'
import { I18nText } from '@/components'
import { queryClient } from '@/providers'
import { useI18n, useMutationErrorHandler, usePagination, useToast } from '@/shared/hooks'
import { Typography } from '@/shared/ui'
import { UserCard } from './UserCard'
import styles from './UsersSection.module.css'

export function UsersSection() {
  const search = useSearch({ from: '/(admin)/users' })
  const { t } = useI18n()

  const usersQuery = useSuspenseQuery(getUsersQueryOptions({ query: { limit: 5, page: search.page } }))

  const pagination = usePagination(usersQuery.data.data.meta.pages)
  const mutationHandler = useMutationErrorHandler()
  const toast = useToast()

  const deleteUserMutation = useDeleteUserMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.deleted-user'))
        queryClient.invalidateQueries({ queryKey: ['getUsers'] })
      },
      onError: mutationHandler,
    },
  })

  const onDelete = (id: number) => deleteUserMutation.mutate({ payload: { params: { id } } })

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">
          <I18nText>title.users</I18nText>
        </Typography>
        <div className={styles.pagination}>
          <div>
            <button
              type="button"
              title={t('aria-label.current-page')}
              aria-label={t('aria-label.current-page')}
              hidden={search.page === 1 || pagination.pages === 0}
              onClick={pagination.onPrevPage}
            >
              <ArrowLeftIcon />
            </button>
          </div>

          <div>
            <span
              aria-label={t('aria-label.current-page')}
              hidden={pagination.pages === 1 || pagination.pages === 0}
            >
              {search.page}
            </span>
          </div>

          <div>
            <button
              type="button"
              title={t('aria-label.next-page')}
              aria-label={t('aria-label.next-page')}
              hidden={search.page === pagination.pages || pagination.pages === 0}
              onClick={pagination.onNextPage}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.users}>
        {!usersQuery.data.data?.users.length && (
          <Typography>
            <I18nText>message.no-users</I18nText>
          </Typography>
        )}
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
