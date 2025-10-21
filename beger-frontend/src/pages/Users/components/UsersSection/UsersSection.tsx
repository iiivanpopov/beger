import { useRouteContext } from '@tanstack/react-router'
import { useDeleteUserMutation, useGetUsersQuery } from '@/api'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'
import { Typography } from '@/shared/ui'
import { UserCard } from './UserCard'
import styles from './UsersSection.module.css'
import { UsersSectionHeader } from './UsersSectionHeader'

export function UsersSection() {
  const { queryClient } = useRouteContext({ from: '__root__' })

  const usersQuery = useGetUsersQuery({ page: 1, limit: 5 })

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

  const onDelete = (id: number) => deleteUserMutation.mutate({ id })

  return (
    <section className={styles.section}>
      <UsersSectionHeader onDelete={onDelete} />

      <div className={styles.users}>
        {!usersQuery.data?.data.users.length && <Typography>No users found...</Typography>}
        {usersQuery.data?.data.users.map((user, i) => (
          <UserCard
            onDelete={onDelete}
            key={user.id}
            user={user}
            i={i}
          />
        ))}
      </div>
    </section>
  )
}
