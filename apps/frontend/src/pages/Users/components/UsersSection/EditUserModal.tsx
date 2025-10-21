import type { User } from '@/api'
import type { UpdateUserParams } from '@/api/requests/users'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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

  const form = useForm<UpdateUserData>({
    defaultValues: { fullName: user.fullName, userName: user.userName, password: '' },
    resolver: valibotResolver(UpdateUserSchema),
  })

  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const updateUserMutation = useUpdateUserMutation({
    options: {
      onSuccess: () => {
        toast.success('Updated user')
        queryClient.invalidateQueries({ queryKey: ['users', 'all'] })
        setIsOpen(false)
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    const payload: UpdateUserParams = {
      fullName: data.fullName,
      userName: data.userName,
      id: user.id,
    }

    if (data.password)
      payload.password = data.password

    updateUserMutation.mutate(payload)
  })

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Modal.Trigger asChild>
        <Button
          icon
          aria-label="edit user"
          title="edit user"
          variant="ghost"
          size="small"
        >
          <EditIcon />
        </Button>
      </Modal.Trigger>
      <Modal.Content className={styles.modal}>
        <Typography variant="subheading" tag="h2">Update user</Typography>
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
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
