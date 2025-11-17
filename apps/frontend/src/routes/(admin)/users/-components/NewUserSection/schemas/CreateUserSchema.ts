import * as v from 'valibot'
import { fullNameValidator, passwordValidator, userNameValidator } from '@/shared/utils'

export const CreateUserSchema = v.object({
  userName: userNameValidator,
  fullName: fullNameValidator,
  password: passwordValidator,
})

export type CreateUserData = v.InferOutput<typeof CreateUserSchema>
