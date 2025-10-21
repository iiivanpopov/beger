import { minValue, number, object, optional, picklist, pipe, string, transform } from 'valibot'

export const EnvSchema = object({
  NODE_ENV: optional(picklist(['development', 'production']), 'development'),
  PORT: pipe(string(), transform(Number), number(), minValue(1)),
  DATABASE_URL: string(),
  JWT_ACCESS_SECRET: string(),
  JWT_REFRESH_SECRET: string(),
  SHEET_URL: string(),
  REDIS_URL: string(),
  ADMIN_PASSWORD: string(),
})
