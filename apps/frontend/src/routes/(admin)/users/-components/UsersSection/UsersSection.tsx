import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Typography } from '@/shared/ui'
import { useUsersSection } from './hooks/useUsersSection'
import { UserCard } from './UserCard'
import styles from './UsersSection.module.css'

export function UsersSection() {
  const { actions, state, queries } = useUsersSection()
  const { t } = useI18n()

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
              hidden={state.search.page === 1 || state.pagination.pages === 0}
              onClick={state.pagination.onPrevPage}
            >
              <ArrowLeftIcon />
            </button>
          </div>

          <div>
            <span
              aria-label={t('aria-label.current-page')}
              hidden={state.pagination.pages === 1 || state.pagination.pages === 0}
            >
              {state.search.page}
            </span>
          </div>

          <div>
            <button
              type="button"
              title={t('aria-label.next-page')}
              aria-label={t('aria-label.next-page')}
              hidden={state.search.page === state.pagination.pages || state.pagination.pages === 0}
              onClick={state.pagination.onNextPage}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.users}>
        {!queries.users.data.data?.users.length && (
          <Typography>
            <I18nText>message.no-users</I18nText>
          </Typography>
        )}
        {queries.users.data.data?.users.map((user, i) => (
          <UserCard
            onDelete={actions.onDelete}
            key={user.id}
            user={user}
            i={i + 1}
          />
        ))}
      </div>
    </section>
  )
}
