import { parse } from 'valibot'
import { EnvSchema } from './env.schema'

const env = parse(EnvSchema, import.meta.env)

export const config = {
  nodeEnv: env.NODE_ENV,
  isProduction: env.NODE_ENV === 'production',
  isDevelopment: env.NODE_ENV !== 'production',

  server: {
    port: env.PORT,
  },

  database: {
    url: env.DATABASE_URL,
  },

  jwt: {
    accessSecret: env.JWT_ACCESS_SECRET,
    refreshSecret: env.JWT_REFRESH_SECRET,
    accessExpiresIn: 15 * 60,
    refreshExpiresIn: 7 * 24 * 60 * 60,
  },

  cookies: {
    accessTokenName: 'accessToken',
    refreshTokenName: 'refreshToken',
  },

  headers: {
    accessToken: 'Authorization',
    refreshToken: 'X-Refresh-Token',
  },

  options: {
    sheetUrl: env.SHEET_URL,
  },

  cache: {
    options: {
      key: 'options',
      ttl: 60 * 5,
    },
  },

  validation: {
    MIN_USERNAME_LEN: 3,
    MIN_PASSWORD_LEN: 6,
    MIN_FULLNAME_LEN: 8,
    MIN_PCB_NAME_LEN: 1,
    MIN_DEFECT_LEN: 1,
  },
}
