import { Controller } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import { TestResultCard } from './components'
import { useTestResultsPage } from './hooks/useTestResultsPage'
import styles from './TestResultsPage.module.css'

export function TestResultsPage() {
  const { form, actions, data, ui } = useTestResultsPage()
  const intl = useIntl()

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">
          <FormattedMessage id="title.create-test-result" />
        </Typography>
        <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button size="small"><FormattedMessage id="action.view-last" /></Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography variant="subheading" tag="h2">
                <FormattedMessage id="title.test-results" />
              </Typography>
            </Modal.Header>
            {!data.testResults.data?.data.length && (
              <Typography>
                <FormattedMessage id="message.no-records" />
              </Typography>
            )}
            <div className={styles.cards}>
              {data.testResults.data?.data.map((testResult, i) => (
                <TestResultCard
                  key={testResult.id}
                  testResult={testResult}
                  i={i + 1}
                  onDelete={actions.onDelete}
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
          name="firstTry"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.first}>
              <Form.Label><FormattedMessage id="label.first-try" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.first-try' })}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="failed"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.failed}>
              <Form.Label><FormattedMessage id="label.failed" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.failed' })}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="total"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.total}>
              <Form.Label><FormattedMessage id="label.total" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.total' })}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit">
          <FormattedMessage id="action.submit" />
        </Button>
      </Form>
    </section>
  )
}
