import { valibotResolver } from '@hookform/resolvers/valibot'
import { useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'
import { useLoginMutation } from '@/api'
import { storageKeys } from '@/shared/config'
import { useMutationErrorHandler } from '@/shared/hooks'
import { passwordValidator, userNameValidator } from '@/shared/utils/validators'

export const LoginSchema = v.object({
  userName: userNameValidator,
  password: passwordValidator,
})

export type LoginData = v.InferOutput<typeof LoginSchema>

export function useLoginPage() {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<LoginData>({
    defaultValues: { password: '', userName: '' },
    resolver: valibotResolver(LoginSchema),
  })

  const mutationErrorHandler = useMutationErrorHandler()
  const navigate = useNavigate()

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

  const onSubmit = form.handleSubmit(body => loginMutation.mutate({ payload: { body } }))

  return {
    ui: {
      modal: {
        isOpen,
        setIsOpen,
      },
    },
    actions: {
      onSubmit,
    },
    form,
  }
}
