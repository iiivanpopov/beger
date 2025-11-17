import type { User } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Badge, Card, ConfirmableButton, Typography } from '@/shared/ui'
import { EditUserModal } from './EditUserModal'

export interface UserCardProps {
  user: User
  i: number
  onDelete: (id: number) => void
}

export function UserCard({ user, i, onDelete }: UserCardProps) {
  const { t } = useI18n()

  return (
    <Card key={user.userName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Card.Row>
          <Typography>{user.fullName}</Typography>
          <Typography variant="caption">
            @
            {user.userName}
          </Typography>
        </Card.Row>
        <Badge color="black" size="small">{user.role}</Badge>
        <Card.Row>
          <Typography variant="caption">
            <I18nText>label.id</I18nText>
            {user.id}
          </Typography>
          <Card.Row>
            <EditUserModal user={user} />
            <ConfirmableButton
              icon
              label={t('button.confirm')}
              variant="ghost"
              size="small"
              aria-label={t('aria-label.delete-user')}
              title={t('aria-label.delete-user')}
              onClick={() => onDelete(user.id)}
            >
              <Trash2Icon />
            </ConfirmableButton>
          </Card.Row>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
