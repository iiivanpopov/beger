import { Controller } from 'react-hook-form'
import { TestResultCard } from '@/components/TestResultCard'
import { Autocomplete, Button, Datepicker, Form, Input, Modal, Typography } from '@/shared/ui'
import { useTestResultsPage } from './hooks/useTestResultsPage'
import styles from './TestResultsPage.module.css'

export function TestResultsPage() {
  const { form, actions, data, ui } = useTestResultsPage()

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new test result</Typography>
        <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
          <Modal.Trigger asChild>
            <Button size="small">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography variant="subheading" tag="h2">Test results</Typography>
            </Modal.Header>
            {!data.testResults.data?.data.length && <Typography>No records found.</Typography>}
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
              <Form.Label>PCB name</Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger placeholder="PCB name" />
                <Autocomplete.Items>
                  {data.options.data?.data.pcbNames.map(pcb => (
                    <Autocomplete.Item key={pcb} value={pcb}>
                      {pcb}
                    </Autocomplete.Item>
                  ))}
                </Autocomplete.Items>
              </Autocomplete>
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <Form.Field className={styles.date}>
              <Form.Label>Date</Form.Label>
              <Datepicker {...field} />
            </Form.Field>
          )}
        />
        <Controller
          name="firstTry"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.first}>
              <Form.Label>First Try</Form.Label>
              <Input {...field} placeholder="123..." type="number" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Controller
          name="failed"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.failed}>
              <Form.Label>Failed</Form.Label>
              <Input {...field} placeholder="456..." type="number" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Controller
          name="total"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.total}>
              <Form.Label>Total</Form.Label>
              <Input {...field} placeholder="789..." type="number" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit">Submit</Button>
      </Form>
    </section>
  )
}
