import { Controller } from 'react-hook-form'
import { RepairCard } from '@/components/RepairCard'
import { Autocomplete, Button, Datepicker, Form, Modal, Textarea, Typography } from '@/shared/ui'
import { useRepairsPage } from './hooks/useRepairsPage'
import styles from './RepairsPage.module.css'

export function RepairsPage() {
  const { form, actions, data, ui } = useRepairsPage()

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <Typography tag="h2" variant="subheading">Create new repair</Typography>
        <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
          <Modal.Trigger className={styles.trigger}>
            <Button size="small">View last</Button>
          </Modal.Trigger>
          <Modal.Content className={styles.records}>
            <Modal.Header>
              <Typography tag="h2" variant="subheading">Repairs</Typography>
            </Modal.Header>
            {!data.repairs.data?.data.length && <Typography>No records found.</Typography>}
            {data.repairs.data?.data.map((repair, i) => (
              <RepairCard
                onDelete={actions.onDelete}
                key={repair.id}
                repair={repair}
                i={i + 1}
              />
            ))}
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
          name="defect"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field className={styles.defect}>
              <Form.Label>Defect</Form.Label>
              <Autocomplete {...field}>
                <Autocomplete.Trigger placeholder="Defect" />
                <Autocomplete.Items>
                  {data.options.data?.data.defects.map(pcb => (
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
          name="note"
          control={form.control}
          render={({ field }) => (
            <Form.Field className={styles.note}>
              <Form.Label>Note</Form.Label>
              <Textarea {...field} placeholder="Optional note" />
            </Form.Field>
          )}
        />
        <Button className={styles.submit} type="submit">Submit</Button>
      </Form>
    </section>
  )
}
