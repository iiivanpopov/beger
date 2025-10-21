import type { ContentfulStatusCode } from 'hono/utils/http-status'

export class ApiError extends Error {
  status: ContentfulStatusCode

  constructor(message = 'Unexpected error', status: ContentfulStatusCode = 500) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }

  static BadRequest(message = 'Bad Request') {
    return new ApiError(message, 400)
  }

  static Unauthorized(message = 'Unauthorized') {
    return new ApiError(message, 401)
  }

  static Forbidden(message = 'Forbidden') {
    return new ApiError(message, 403)
  }

  static NotFound(message = 'Not Found') {
    return new ApiError(message, 404)
  }

  static InternalServerError(message = 'Internal Server Error') {
    return new ApiError(message, 500)
  }

  toJSON() {
    return {
      success: false,
      message: this.message,
    }
  }
}
