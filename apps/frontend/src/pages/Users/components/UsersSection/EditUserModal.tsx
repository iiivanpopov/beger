import type { UpdateUserPayload, User } from '@/api'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import * as v from 'valibot'
import { useUpdateUserMutation } from '@/api'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import { fullNameValidator, passwordValidator, userNameValidator } from '@/shared/utils'
import styles from './EditUserModal.module.css'

const UpdateUserSchema = v.object({
  userName: userNameValidator,
  fullName: fullNameValidator,
  password: v.union([v.pipe(v.string(), v.empty()), passwordValidator]),
})

type UpdateUserData = v.InferOutput<typeof UpdateUserSchema>

export interface EditUserModalProps {
  user: User
}

export function EditUserModal({ user }: EditUserModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { queryClient } = useRouteContext({ from: '__root__' })
  const intl = useIntl()

  const form = useForm<UpdateUserData>({
    defaultValues: { fullName: user.fullName, userName: user.userName, password: '' },
    resolver: valibotResolver(UpdateUserSchema),
  })

  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const updateUserMutation = useUpdateUserMutation({
    options: {
      onSuccess: () => {
        toast.success(intl.formatMessage({ id: 'message.updated-user' }))
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        setIsOpen(false)
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = form.handleSubmit((body) => {
    const updateData: UpdateUserPayload['body'] = {
      fullName: body.fullName,
      userName: body.userName,
    }

    if (body.password)
      updateData.password = body.password

    updateUserMutation.mutate({
      payload: {
        body: updateData,
        params: {
          id: user.id,
        },
      },
    })
  })

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Trigger asChild>
        <Button
          icon
          aria-label={intl.formatMessage({ id: 'aria-label.edit-user' })}
          title={intl.formatMessage({ id: 'aria-label.edit-user' })}
          variant="ghost"
          size="small"
        >
          <EditIcon />
        </Button>
      </Modal.Trigger>
      <Modal.Content className={styles.modal}>
        <Typography variant="subheading" tag="h2"><FormattedMessage id="title.update-user" /></Typography>
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
          <Button type="submit"><FormattedMessage id="action.update" /></Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
