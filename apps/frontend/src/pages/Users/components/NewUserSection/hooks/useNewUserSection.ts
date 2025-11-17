import type { CreateUserData } from '../schemas/CreateUserSchema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '@/api'
import { queryClient } from '@/providers'
import { useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { CreateUserSchema } from '../schemas/CreateUserSchema'

const createUserFormDefaultValues = { fullName: '', userName: '', password: '' }

export function useNewUserSection() {
  const createUserForm = useForm<CreateUserData>({
    defaultValues: createUserFormDefaultValues,
    resolver: valibotResolver(CreateUserSchema),
  })

  const { t } = useI18n()
  const toast = useToast()
  const mutationHandler = useMutationErrorHandler()

  const registerMutation = useRegisterMutation({
    options: {
      onError: mutationHandler,
    },
  })

  const onSubmit = createUserForm.handleSubmit(async (body) => {
    await registerMutation.mutateAsync({ payload: { body } })
    toast.success(t('message.created-user'))
    createUserForm.reset()
    queryClient.invalidateQueries({ queryKey: ['getUsers'] })
  })

  return {
    actions: {
      onSubmit,
    },
    state: {
      createUserForm,
    },
  }
}
