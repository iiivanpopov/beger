import type { Context } from 'hono'
import type { JWTPayload } from 'hono/utils/jwt/types'
import type { UserJwtPayload } from './jwt'
import { Hono } from 'hono'

export interface AppRouter {
  Variables: {
    jwtPayload: JWTPayload & UserJwtPayload
  }
}
export type AppContext = Context<AppRouter>

export const createRouter = () => new Hono<AppRouter>()
