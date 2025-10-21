import type { Context } from 'hono'
import { ApiError } from '@/exceptions'
import { isUnauthorizedError } from '@/utils'

export function errorMiddleware(error: unknown, c: Context) {
  if (isUnauthorizedError(error)) {
    return c.json(ApiError.Unauthorized(error.message).toJSON(), 401)
  }
  if (error instanceof ApiError)
    return c.json(error.toJSON(), error.status)

  console.error(error)

  return c.json(new ApiError.InternalServerError().toJSON(), 500)
}
