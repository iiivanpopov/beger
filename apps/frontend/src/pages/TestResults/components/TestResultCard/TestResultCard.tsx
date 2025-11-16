import type { TestResult } from '@/api'
import { Trash2Icon } from 'lucide-react'
import { I18nText } from '@/components'
import { useI18n, useToast } from '@/shared/hooks'
import { Card, ConfirmableButton, Tooltip, Typography } from '@/shared/ui'
import styles from './TestResultCard.module.css'

export interface TestResultCardProps {
  testResult: TestResult
  onDelete: (id: number) => void
  i: number
}

export function TestResultCard({ testResult, i, onDelete }: TestResultCardProps) {
  const toast = useToast()
  const { t } = useI18n()

  const onCopy = async () => {
    await navigator.clipboard.writeText(testResult.pcbName)
    toast.info(t('message.copied-clipboard'))
  }

  return (
    <Card key={testResult.pcbName}>
      <Card.Index>{i}</Card.Index>
      <Card.Content>
        <Card.Row>
          <Tooltip>
            <Tooltip.Trigger className={styles.trigger}>
              <button type="button" onClick={onCopy} className={styles.title}>
                {testResult.pcbName}
              </button>
            </Tooltip.Trigger>
            <Tooltip.Content>{testResult.pcbName}</Tooltip.Content>
          </Tooltip>
        </Card.Row>
        <Typography>
          {testResult.firstTry}
          /
          {testResult.failed}
          /
          {testResult.total}
        </Typography>
        <Card.Row>
          <Typography variant="caption">
            <I18nText>label.id</I18nText>
            {testResult.id}
          </Typography>
          <Typography variant="caption">
            {new Date(testResult.date).toLocaleDateString()}
          </Typography>
          <ConfirmableButton
            icon
            variant="ghost"
            size="small"
            onClick={() => onDelete(testResult.id)}
          >
            <Trash2Icon />
          </ConfirmableButton>
        </Card.Row>
      </Card.Content>
    </Card>
  )
}
