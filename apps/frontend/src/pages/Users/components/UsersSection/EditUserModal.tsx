import type { UpdateUserPayload, User } from '@/api'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as v from 'valibot'
import { useUpdateUserMutation } from '@/api'
import { I18nText } from '@/components'
import { useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
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
  const { t } = useI18n()

  const form = useForm<UpdateUserData>({
    defaultValues: { fullName: user.fullName, userName: user.userName, password: '' },
    resolver: valibotResolver(UpdateUserSchema),
  })

  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const updateUserMutation = useUpdateUserMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.updated-user'))
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
          aria-label={t('aria-label.edit-user')}
          title={t('aria-label.edit-user')}
          variant="ghost"
          size="small"
        >
          <EditIcon />
        </Button>
      </Modal.Trigger>
      <Modal.Content className={styles.modal}>
        <Typography variant="subheading" tag="h2">
          <I18nText>title.update-user</I18nText>
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
            <I18nText>action.update</I18nText>
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
