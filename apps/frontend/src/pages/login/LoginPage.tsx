import { Controller } from 'react-hook-form'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { useLoginPage } from './hooks/useLoginPage'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { form, actions, ui } = useLoginPage()

  return (
    <section className={styles.section}>
      <Typography variant="subheading" tag="h2">Unauthorized</Typography>
      <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
        <Modal.Trigger asChild>
          <Button>Login</Button>
        </Modal.Trigger>
        <Modal.Content>
          <div className={styles.modal}>
            <Typography variant="heading" tag="h1">Login</Typography>
            <Form onSubmit={actions.onSubmit}>
              <Controller
                control={form.control}
                name="userName"
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>User name</Form.Label>
                    <Input {...field} invalid={fieldState.invalid} placeholder="User Name" autoComplete="username" />
                    <Form.Error>{fieldState.error?.message}</Form.Error>
                  </Form.Field>
                )}
              />
              <Controller
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Form.Field {...fieldState}>
                    <Form.Label>Password</Form.Label>
                    <Input {...field} type="password" invalid={fieldState.invalid} placeholder="Password" autoComplete="current-password" />
                    <Form.Error>{fieldState.error?.message}</Form.Error>
                  </Form.Field>
                )}
              />
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </section>
  )
}
