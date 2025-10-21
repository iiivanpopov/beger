import { jwt } from 'hono/jwt'
import { config } from '@/config'

export const accessJwtMiddleware = jwt({
  secret: process.env.JWT_ACCESS_SECRET!,
  headerName: config.headers.accessToken,
})

export const refreshJwtMiddleware = jwt({
  secret: process.env.JWT_REFRESH_SECRET!,
  headerName: config.headers.refreshToken,
})
