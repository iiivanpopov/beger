import { Controller } from 'react-hook-form'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Autocomplete, Button, Datepicker, Form, Modal, Textarea, Typography } from '@/shared/ui'
import { RepairCard } from './-components'
import { useRepairsPage } from './-hooks/useRepairsPage'
import styles from './-page.module.css'

export function Page() {
  const { actions, queries, state } = useRepairsPage()
  const { t } = useI18n()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">
          <I18nText>action.new-repair</I18nText>
        </Typography>
        <Modal isOpen={state.lastRepairsModal.isOpen} setIsOpen={state.lastRepairsModal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button size="small">
              <I18nText>action.view-last</I18nText>
            </Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography tag="h2" variant="subheading">
                <I18nText>title.repairs</I18nText>
              </Typography>
            </Modal.Header>
            {!queries.repairs.data?.data.length && (
              <Typography>
                <I18nText>message.no-records</I18nText>
              </Typography>
            )}
            <div className={styles.cards}>
              {queries.repairs.data?.data.map((repair, i) => (
                <RepairCard
                  onDelete={actions.onDelete}
                  key={repair.id}
                  repair={repair}
                  i={i + 1}
                />
              ))}
            </div>
          </Modal.Content>
        </Modal>
      </div>
      <Form onSubmit={actions.onSubmit} className={styles.form}>
        <Controller
          name="pcbName"
          control={state.createRepairForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.pcb}>
              <Form.Label>
                <I18nText>label.pcb-name</I18nText>
              </Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger placeholder={t('placeholder.pcb-name')} />
                <Autocomplete.Items>
                  {queries.options.data?.data.pcbNames.map(pcb => (
                    <Autocomplete.Item key={pcb} value={pcb}>
                      {pcb}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Items>
              </Autocomplete>
              {fieldState.error?.message && (
                <Form.Error>
                  <I18nText>{fieldState.error?.message}</I18nText>
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="defect"
          control={state.createRepairForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.defect}>
              <Form.Label>
                <I18nText>label.defect</I18nText>
              </Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger placeholder={t('placeholder.defect')} />
                <Autocomplete.Items>
                  {queries.options.data?.data.defects.map(pcb => (
                    <Autocomplete.Item key={pcb} value={pcb}>
                      {pcb}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Items>
              </Autocomplete>
              {fieldState.error?.message && (
                <Form.Error>
                  <I18nText>{fieldState.error?.message}</I18nText>
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="date"
          control={state.createRepairForm.control}
          render={({ field }) => (
            <Form.Field className={styles.date}>
              <Form.Label>
                <I18nText>label.date</I18nText>
              </Form.Label>
              <Datepicker {...field} />
            </Form.Field>
          )}
        />
        <Controller
          name="note"
          control={state.createRepairForm.control}
          render={({ field }) => (
            <Form.Field className={styles.note}>
              <Form.Label>
                <I18nText>label.note</I18nText>
              </Form.Label>
              <Textarea
                {...field}
                placeholder={t('placeholder.note')}
              />
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit">
          <I18nText>action.submit</I18nText>
        </Button>
      </Form>
    </div>
  )
}
