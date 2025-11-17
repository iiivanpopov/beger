import { Controller } from 'react-hook-form'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import { TestResultCard } from './components'
import { useTestResultsPage } from './hooks/useTestResultsPage'
import styles from './TestResultsPage.module.css'

export function TestResultsPage() {
  const { actions, queries, state } = useTestResultsPage()
  const { t } = useI18n()

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">
          <I18nText>title.create-test-result</I18nText>
        </Typography>
        <Modal isOpen={state.lastTestResultsModal.isOpen} setIsOpen={state.lastTestResultsModal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button size="small">
              <I18nText>action.view-last</I18nText>
            </Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography variant="subheading" tag="h2">
                <I18nText>title.test-results</I18nText>
              </Typography>
            </Modal.Header>
            {!queries.testResults.data?.data.length && (
              <Typography>
                <I18nText>message.no-records</I18nText>
              </Typography>
            )}
            <div className={styles.cards}>
              {queries.testResults.data?.data.map((testResult, i) => (
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
          control={state.createTestResultForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.pcb}>
              <Form.Label>
                <I18nText>label.pcb-name</I18nText>
              </Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger
                  placeholder={t('placeholder.pcb-name')}
                />
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
          name="date"
          control={state.createTestResultForm.control}
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
          name="firstTry"
          control={state.createTestResultForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.first}>
              <Form.Label>
                <I18nText>label.first-try</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.first-try')}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <I18nText>{fieldState.error?.message}</I18nText>
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="failed"
          control={state.createTestResultForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.failed}>
              <Form.Label>
                <I18nText>label.failed</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.failed')}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <I18nText>{fieldState.error?.message}</I18nText>
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="total"
          control={state.createTestResultForm.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.total}>
              <Form.Label>
                <I18nText>label.total</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.total')}
                type="number"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <I18nText>{fieldState.error?.message}</I18nText>
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit">
          <I18nText>action.submit</I18nText>
        </Button>
      </Form>
    </section>
  )
}
