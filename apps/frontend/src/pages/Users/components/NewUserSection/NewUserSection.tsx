import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import * as v from 'valibot'
import { useRegisterMutation } from '@/api'
import { I18nText } from '@/components'
import { useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
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
  const { t } = useI18n()

  const form = useForm<CreateUserData>({
    defaultValues: { fullName: '', userName: '', password: '' },
    resolver: valibotResolver(CreateUserSchema),
  })

  const toast = useToast()
  const mutationHandler = useMutationErrorHandler()

  const registerMutation = useRegisterMutation({
    options: {
      onSuccess: async () => {
        toast.success(t('message.created-user'))
        form.reset()
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
      },
      onError: mutationHandler,
    },
  })

  const onSubmit = form.handleSubmit(body => registerMutation.mutate({ payload: { body } }))

  return (
    <section className={styles.section}>
      <Typography tag="h2" variant="subheading">
        <I18nText>title.new-user</I18nText>
      </Typography>
      <Form onSubmit={onSubmit}>
        <Controller
          name="userName"
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
