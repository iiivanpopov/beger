import * as v from 'valibot'
import { passwordValidator, userNameValidator } from '@/shared/utils'

export const LoginSchema = v.object({
  userName: userNameValidator,
  password: passwordValidator,
})

export type LoginData = v.InferOutput<typeof LoginSchema>
