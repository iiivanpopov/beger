import type { InferOutput } from 'valibot'
import { object } from 'valibot'
import { passwordValidation, userNameValidation } from '@/utils'

export const LoginBody = object({
  userName: userNameValidation,
  password: passwordValidation,
})

export type LoginData = InferOutput<typeof LoginBody>
