import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import * as v from 'valibot'
import { useRegisterMutation } from '@/api'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'
import { Button, Form, Input, Typography } from '@/shared/ui'
import { fullNameValidator, passwordValidator, userNameValidator } from '@/shared/utils/validators'
import styles from './NewUserSection.module.css'

const CreateUserSchema = v.object({
  userName: userNameValidator,
  fullName: fullNameValidator,
  password: passwordValidator,
})

type CreateUserData = v.InferOutput<typeof CreateUserSchema>

export function NewUserSection() {
  const { queryClient } = useRouteContext({ from: '__root__' })
  const intl = useIntl()

  const form = useForm<CreateUserData>({
    defaultValues: { fullName: '', userName: '', password: '' },
    resolver: valibotResolver(CreateUserSchema),
  })

  const toast = useToast()
  const mutationHandler = useMutationErrorHandler()

  const registerMutation = useRegisterMutation({
    options: {
      onSuccess: async () => {
        toast.success(intl.formatMessage({ id: 'message.created-user' }))
        form.reset()
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
      },
      onError: mutationHandler,
    },
  })

  const onSubmit = form.handleSubmit(body => registerMutation.mutate({ payload: { body } }))

  return (
    <section className={styles.section}>
      <Typography tag="h2" variant="subheading"><FormattedMessage id="title.new-user" /></Typography>
      <Form onSubmit={onSubmit}>
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label><FormattedMessage id="label.user-name" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.user-name' })}
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
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label><FormattedMessage id="label.full-name" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.full-name' })}
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
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label><FormattedMessage id="label.password" /></Form.Label>
              <Input
                {...field}
                placeholder={intl.formatMessage({ id: 'placeholder.password-mask' })}
                type="password"
              />
              {fieldState.error?.message && (
                <Form.Error>
                  <FormattedMessage id={fieldState.error?.message} />
                </Form.Error>
              )}
            </Form.Field>
          )}
        />
        <Button type="submit"><FormattedMessage id="action.register" /></Button>
      </Form>
    </section>
  )
}
