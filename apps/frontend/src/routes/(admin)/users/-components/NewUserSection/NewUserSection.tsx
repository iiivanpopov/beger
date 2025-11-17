import { Controller } from 'react-hook-form'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Button, Form, Input, Typography } from '@/shared/ui'
import { useNewUserSection } from './hooks/useNewUserSection'
import styles from './NewUserSection.module.css'

export function NewUserSection() {
  const { actions, state } = useNewUserSection()
  const { t } = useI18n()

  return (
    <section className={styles.section}>
      <Typography tag="h2" variant="subheading">
        <I18nText>title.new-user</I18nText>
      </Typography>
      <Form onSubmit={actions.onSubmit}>
        <Controller
          name="userName"
          control={state.createUserForm.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>
                <I18nText>label.user-name</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.user-name')}
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
          name="fullName"
          control={state.createUserForm.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>
                <I18nText>label.full-name</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.full-name')}
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
          name="password"
          control={state.createUserForm.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>
                <I18nText>label.password</I18nText>
              </Form.Label>
              <Input
                {...field}
                placeholder={t('placeholder.password-mask')}
                type="password"
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
          <I18nText>action.register</I18nText>
        </Button>
      </Form>
    </section>
  )
}
