import type { HTTPError } from 'ky'
import type { ApiError } from '@/api'

export async function extractErrorMessage(error: HTTPError<ApiError>): Promise<string> {
  if (!error.response)
    return error.message

  try {
    const response = await error.response.json()
    return response.message || error.message
  }
  catch {
    return error.message
  }
}
