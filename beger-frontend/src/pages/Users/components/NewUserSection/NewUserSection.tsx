import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
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

  const form = useForm<CreateUserData>({
    defaultValues: { fullName: '', userName: '', password: '' },
    resolver: valibotResolver(CreateUserSchema),
  })

  const toast = useToast()
  const mutationHandler = useMutationErrorHandler()

  const registerMutation = useRegisterMutation({
    options: {
      onSuccess: () => {
        toast.success('Created user')
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        form.reset()
      },
      onError: mutationHandler,
    },
  })

  const onSubmit = form.handleSubmit(data => registerMutation.mutate(data))

  return (
    <section className={styles.section}>
      <Typography tag="h2" variant="subheading">New user</Typography>
      <Form onSubmit={onSubmit}>
        <Controller
          name="userName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>User Name</Form.Label>
              <Input {...field} placeholder="User Name" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>Full Name</Form.Label>
              <Input {...field} placeholder="Full Name" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Form.Field>
              <Form.Label>Password</Form.Label>
              <Input {...field} placeholder="*******" type="password" />
              <Form.Error>{fieldState.error?.message}</Form.Error>
            </Form.Field>
          )}
        />
        <Button type="submit">Register</Button>
      </Form>
    </section>
  )
}
