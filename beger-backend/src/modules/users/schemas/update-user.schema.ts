import type { InferOutput } from 'valibot'
import { object, optional } from 'valibot'
import { fullNameValidation, passwordValidation, userNameValidation } from '@/utils'

export const UpdateUserBody = object({
  userName: optional(userNameValidation),
  fullName: optional(fullNameValidation),
  password: optional(passwordValidation),
})

export type UpdateUserData = InferOutput<typeof UpdateUserBody>
