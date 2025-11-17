import * as v from 'valibot'
import { fullNameValidator, passwordValidator, userNameValidator } from '@/shared/utils'

export const UpdateUserSchema = v.object({
  userName: userNameValidator,
  fullName: fullNameValidator,
  password: v.union([v.pipe(v.string(), v.empty()), passwordValidator]),
})

export type UpdateUserData = v.InferOutput<typeof UpdateUserSchema>
