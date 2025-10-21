import type { User } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { Badge, Card, ConfirmableButton, Typography } from '@/shared/ui'
import { EditUserModal } from './EditUserModal'

export interface UserCardProps {
  user: User
  i: number
  onDelete: (id: number) => void
}

export function UserCard({ user, i, onDelete }: UserCardProps) {
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
            id:
            {user.id}
          </Typography>
          <Card.Row>
            <EditUserModal user={user} />
            <ConfirmableButton
              icon
              variant="ghost"
              size="small"
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
