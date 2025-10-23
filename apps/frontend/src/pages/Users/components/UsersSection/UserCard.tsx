import type { User } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { FormattedMessage, useIntl } from 'react-intl'
import { Badge, Card, ConfirmableButton, Typography } from '@/shared/ui'
import { EditUserModal } from './EditUserModal'

export interface UserCardProps {
  user: User
  i: number
  onDelete: (id: number) => void
}

export function UserCard({ user, i, onDelete }: UserCardProps) {
  const intl = useIntl()

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
            <FormattedMessage id="label.id" />
            {user.id}
          </Typography>
          <Card.Row>
            <EditUserModal user={user} />
            <ConfirmableButton
              icon
              variant="ghost"
              size="small"
              aria-label={intl.formatMessage({ id: 'aria-label.delete-user' })}
              title={intl.formatMessage({ id: 'aria-label.delete-user' })}
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
