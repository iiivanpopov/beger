import { Controller } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { useLoginPage } from './hooks/useLoginPage'
import styles from './LoginPage.module.css'

export function LoginPage() {
  const { form, actions, ui } = useLoginPage()
  const intl = useIntl()

  return (
    <div className={styles.page}>
      <Typography variant="subheading" tag="h2"><FormattedMessage id="unauthorized" /></Typography>
      <Modal isOpen={ui.modal.isOpen} setIsOpen={ui.modal.setIsOpen}>
        <Modal.Trigger asChild>
          <Button><FormattedMessage id="action.login" /></Button>
        </Modal.Trigger>
        <Modal.Content>
          <div className={styles.modal}>
            <Typography variant="heading" tag="h1"><FormattedMessage id="action.login" /></Typography>
            <Form onSubmit={actions.onSubmit}>
              <Controller
                control={form.control}
                name="userName"
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label><FormattedMessage id="placeholder.username" /></Form.Label>
                    <Input
                      {...field}
                      invalid={fieldState.invalid}
                      placeholder={intl.formatMessage({ id: 'placeholder.username' })}
                      autoComplete="username"
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
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Form.Field {...fieldState}>
                    <Form.Label><FormattedMessage id="placeholder.password" /></Form.Label>
                    <Input
                      {...field}
                      type="password"
                      invalid={fieldState.invalid}
                      placeholder={intl.formatMessage({ id: 'placeholder.password' })}
                      autoComplete="current-password"
                    />
                    {fieldState.error?.message && (
                      <Form.Error>
                        <FormattedMessage id={fieldState.error?.message} />
                      </Form.Error>
                    )}
                  </Form.Field>
                )}
              />
              <Button type="submit"><FormattedMessage id="action.submit" /></Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}
