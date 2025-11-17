import { Controller } from 'react-hook-form'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { useLoginPage } from './-hooks/useLoginPage'
import styles from './-page.module.css'

export function Page() {
  const { state, actions } = useLoginPage()
  const { t } = useI18n()

  return (
    <div className={styles.page}>
      <Typography variant="subheading" tag="h2">
        <I18nText>unauthorized</I18nText>
      </Typography>
      <Modal isOpen={state.loginModal.isOpen} setIsOpen={state.loginModal.setIsOpen}>
        <Modal.Trigger asChild>
          <Button>
            <I18nText>action.login</I18nText>
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <div className={styles.modal}>
            <Typography variant="heading" tag="h1">
              <I18nText>action.login</I18nText>
            </Typography>
            <Form onSubmit={actions.onSubmit}>
              <Controller
                control={state.loginForm.control}
                name="userName"
                render={({ field, fieldState }) => (
                  <Form.Field>
                    <Form.Label>
                      <I18nText>placeholder.username</I18nText>
                    </Form.Label>
                    <Input
                      {...field}
                      invalid={fieldState.invalid}
                      placeholder={t('placeholder.username')}
                      autoComplete="username"
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
                control={state.loginForm.control}
                name="password"
                render={({ field, fieldState }) => (
                  <Form.Field {...fieldState}>
                    <Form.Label>
                      <I18nText>placeholder.password</I18nText>
                    </Form.Label>
                    <Input
                      {...field}
                      type="password"
                      invalid={fieldState.invalid}
                      placeholder={t('placeholder.password')}
                      autoComplete="current-password"
                    />
                    {fieldState.error?.message && (
                      <Form.Error>
                        <I18nText>{fieldState.error?.message}</I18nText>
                      </Form.Error>
                    )}
                  </Form.Field>
                )}
              />
              <Button type="submit">
                <I18nText>action.submit</I18nText>
              </Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  )
}
