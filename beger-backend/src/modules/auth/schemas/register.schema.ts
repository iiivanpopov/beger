import type { InferOutput } from 'valibot'
import { object } from 'valibot'
import { fullNameValidation, passwordValidation, userNameValidation } from '@/utils'

export const RegisterBody = object({
  userName: userNameValidation,
  password: passwordValidation,
  fullName: fullNameValidation,
})

export type RegisterData = InferOutput<typeof RegisterBody>
