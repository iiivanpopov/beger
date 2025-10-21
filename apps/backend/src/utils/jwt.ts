import type { JWTPayload } from 'hono/utils/jwt/types'
import type { AppContext } from './hono'
import type { UserRole } from '@/database/tables'
import { sign, verify } from 'hono/jwt'
import { config } from '@/config'
import { ApiError } from '@/exceptions/api-error'

export interface UserJwtPayload {
  sub: string
  role: UserRole
}

export async function signJWT({ sub, role }: UserJwtPayload, expiresIn: number, secret: string) {
  try {
    const token = await sign({
      sub,
      role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + expiresIn,
    }, secret)
    return token
  }
  catch (error) {
    console.error(error)
    throw ApiError.Unauthorized()
  }
}

export async function signJWTs(payload: UserJwtPayload) {
  return {
    accessToken: await signJWT(payload, config.jwt.accessExpiresIn, config.jwt.accessSecret),
    refreshToken: await signJWT(payload, config.jwt.refreshExpiresIn, config.jwt.refreshSecret),
  }
}

export async function verifyJWT(token: string, secret: string): Promise<JWTPayload & UserJwtPayload> {
  try {
    const payload = await verify(token, secret)
    return payload as JWTPayload & UserJwtPayload
  }
  catch (error) {
    console.error(error)
    throw ApiError.Unauthorized()
  }
}

export const getUserId = (c: AppContext) => Number(c.get('jwtPayload').sub)
export const getUserRole = (c: AppContext) => c.get('jwtPayload').role

export const getAccessToken = (c: AppContext) => c.req.header(config.headers.accessToken)?.split(' ')[1]
export const getRefreshToken = (c: AppContext) => c.req.header(config.headers.refreshToken)?.split(' ')[1]
