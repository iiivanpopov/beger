import type { Repair } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { useToast } from '@/shared/hooks'
import { Card, ConfirmableButton, Tooltip, Typography } from '@/shared/ui'
import styles from './RepairCard.module.css'

export interface RepairCardProps {
  repair: Repair
  onDelete: (id: number) => void
  i: number
}

export function RepairCard({ repair, i, onDelete }: RepairCardProps) {
  const toast = useToast()

  const onCopy = async () => {
    await navigator.clipboard.writeText(repair.pcbName)
    toast.info('Copied to clipboard')
  }

  return (
    <Card key={repair.pcbName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Tooltip>
          <Tooltip.Trigger className={styles.trigger}>
            <button type="button" className={styles.title} onClick={onCopy}>
              {repair.pcbName}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content>{repair.pcbName}</Tooltip.Content>
        </Tooltip>

        <Typography>{repair.defect}</Typography>
        <Card.Row>
          <Typography variant="caption">
            id:
            {repair.id}
          </Typography>
          <Typography variant="caption">
            {new Date(repair.date).toLocaleDateString()}
          </Typography>
          <ConfirmableButton
            icon
            variant="ghost"
            size="small"
            onClick={() => onDelete(repair.id)}
          >
            <Trash2Icon />
          </ConfirmableButton>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
