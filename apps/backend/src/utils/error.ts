import type { ApiError } from '@/exceptions'

export function isUnauthorizedError(error: unknown): error is ApiError {
  if (
    typeof error === 'object'
    && error !== null
    && 'status' in error
    && 'message' in error
  ) {
    return error.status === 401 && typeof error.message === 'string'
  }
  return false
}
