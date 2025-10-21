import { jwt } from 'hono/jwt'
import { config } from '@/config'

export const accessJwtMiddleware = jwt({
  secret: config.jwt.accessSecret,
  headerName: config.headers.accessToken,
})

export const refreshJwtMiddleware = jwt({
  secret: config.jwt.refreshSecret,
  headerName: config.headers.refreshToken,
})
