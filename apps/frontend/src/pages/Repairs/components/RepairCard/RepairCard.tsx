import type { Repair } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { I18nDate, I18nText } from '@/components'
import { useI18n, useToast } from '@/shared/hooks'
import { Button, Card, ConfirmableButton, Tooltip, Typography } from '@/shared/ui'
import styles from './RepairCard.module.css'

export interface RepairCardProps {
  repair: Repair
  onDelete: (id: number) => void
  i: number
}

export function RepairCard({ repair, i, onDelete }: RepairCardProps) {
  const toast = useToast()
  const { t } = useI18n()

  const onCopy = async () => {
    await navigator.clipboard.writeText(repair.pcbName)
    toast.info(t('message.copied-clipboard'))
  }

  return (
    <Card key={repair.pcbName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Tooltip>
          <Tooltip.Trigger className={styles.trigger}>
            <Button type="button" variant="ghost" className={styles.title} onClick={onCopy}>
              {repair.pcbName}
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content>{repair.pcbName}</Tooltip.Content>
        </Tooltip>

        <Typography>{repair.defect}</Typography>
        <Card.Row>
          <Typography variant="caption">
            <I18nText>label.id</I18nText>
            {repair.id}
          </Typography>
          <Typography variant="caption">
            <I18nDate>{repair.date}</I18nDate>
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
