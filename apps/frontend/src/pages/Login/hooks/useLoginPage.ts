import type { LoginData } from '../schemas/LoginSchema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useNavigate } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { useLoginMutation } from '@/api'
import { storageKeys } from '@/shared/config'
import { useDisclosure, useMutationErrorHandler } from '@/shared/hooks'
import { LoginSchema } from '../schemas/LoginSchema'

const loginFormDefaultValues = { password: '', userName: '' }

export function useLoginPage() {
  const loginModal = useDisclosure()
  const loginForm = useForm<LoginData>({
    defaultValues: loginFormDefaultValues,
    resolver: valibotResolver(LoginSchema),
  })

  const navigate = useNavigate()
  const mutationErrorHandler = useMutationErrorHandler()

  const loginMutation = useLoginMutation({
    options: {
      onSuccess: (data) => {
        localStorage.setItem(storageKeys.accessToken, data.data.tokens.accessToken)
        localStorage.setItem(storageKeys.refreshToken, data.data.tokens.refreshToken)
        navigate({ to: data.data.user.role === 'admin' ? '/users' : '/test-results' })
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = loginForm.handleSubmit(body => loginMutation.mutate({ payload: { body } }))

  return {
    actions: {
      onSubmit,
    },
    state: {
      loginForm,
      loginModal,
    },
  }
}
