import type { UpdateUserData } from '../schemas/EditUserSchema'
import type { UpdateUserPayload, User } from '@/api'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useUpdateUserMutation } from '@/api'
import { queryClient } from '@/providers'
import { useDisclosure, useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { UpdateUserSchema } from '../schemas/EditUserSchema'

function updateUserFormDefaultValues(user: User) {
  return { fullName: user.fullName, userName: user.userName, password: '' }
}

export function useEditUserModal(user: User) {
  const editUserModal = useDisclosure()
  const editUserForm = useForm<UpdateUserData>({
    defaultValues: updateUserFormDefaultValues(user),
    resolver: valibotResolver(UpdateUserSchema),
  })

  const { t } = useI18n()
  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const updateUserMutation = useUpdateUserMutation({
    options: {
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = editUserForm.handleSubmit(async (body) => {
    const updateData: UpdateUserPayload['body'] = {
      fullName: body.fullName,
      userName: body.userName,
    }

    if (body.password)
      updateData.password = body.password

    await updateUserMutation.mutateAsync({
      payload: {
        body: updateData,
        params: {
          id: user.id,
        },
      },
    })

    toast.success(t('message.updated-user'))
    queryClient.invalidateQueries({ queryKey: ['getUsers'] })
    editUserModal.close()
  })

  return {
    actions: {
      onSubmit,
    },
    state: {
      editUserModal,
      editUserForm,
    },
  }
}
