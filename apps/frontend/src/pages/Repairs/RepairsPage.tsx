import { Controller } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Autocomplete, Button, Datepicker, Form, Modal, Textarea, Typography } from '@/shared/ui'
import { RepairCard } from './components'
import { useRepairsPage } from './hooks/useRepairsPage'
import styles from './RepairsPage.module.css'

export function RepairsPage() {
  const { form, actions, data, ui } = useRepairsPage()
  const intl = useIntl()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">
          <FormattedMessage id="action.new-repair" />
        </Typography>
        <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button size="small"><FormattedMessage id="action.view-last" /></Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography tag="h2" variant="subheading"><FormattedMessage id="title.repairs" /></Typography>
            </Modal.Header>
            {!data.repairs.data?.data.length && <Typography><FormattedMessage id="message.no-records" /></Typography>}
            <div className={styles.cards}>
              {data.repairs.data?.data.map((repair, i) => (
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
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.pcb}>
              <Form.Label><FormattedMessage id="label.pcb-name" /></Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger
                  placeholder={intl.formatMessage({ id: 'placeholder.pcb-name' })}
                />
                <Autocomplete.Items>
                  {data.options.data?.data.pcbNames.map(pcb => (
                    <Autocomplete.Item key={pcb} value={pcb}>
                      {pcb}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Items>
              </Autocomplete>
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="defect"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.defect}>
              <Form.Label><FormattedMessage id="label.defect" /></Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger
                  placeholder={intl.formatMessage({ id: 'placeholder.defect' })}
                />
                <Autocomplete.Items>
                  {data.options.data?.data.defects.map(pcb => (
                    <Autocomplete.Item key={pcb} value={pcb}>
                      {pcb}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Items>
              </Autocomplete>
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <Form.Field className={styles.date}>
              <Form.Label><FormattedMessage id="label.date" /></Form.Label>
              <Datepicker {...field} />
            </Form.Field>
          )}
        />
        <Controller
          name="note"
          control={form.control}
          render={({ field }) => (
            <Form.Field className={styles.note}>
              <Form.Label><FormattedMessage id="label.note" /></Form.Label>
              <Textarea
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.note' })}
              />
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit"><FormattedMessage id="action.submit" /></Button>
      </Form>
    </div>
  )
}
