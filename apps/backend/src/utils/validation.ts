import type { InferOutput } from 'valibot'
import {
  date,
  maxLength,
  minLength,
  minValue,
  object,
  optional,
  pipe,
  string,
  transform,
} from 'valibot'
import { config } from '@/config'

export const PaginationSchema = object({
  page: optional(pipe(string(), transform(Number), minValue(1)), '0'),
  limit: optional(pipe(string(), transform(Number), minValue(1)), '10'),
})
export type PaginationData = InferOutput<typeof PaginationSchema>

export const IdSchema = object({
  id: pipe(string(), transform(Number)),
})
export type IdData = InferOutput<typeof IdSchema>

export const userNameValidation = pipe(string(), minLength(config.validation.MIN_USERNAME_LEN))
export const fullNameValidation = pipe(string(), minLength(config.validation.MIN_FULLNAME_LEN))
export const passwordValidation = pipe(string(), minLength(config.validation.MIN_PASSWORD_LEN))
export const pcbNameValidation = pipe(
  string(),
  minLength(config.validation.MIN_PCB_NAME_LEN),
  maxLength(255),
)
export const dateValidation = pipe(
  string(),
  transform((input: string) => new Date(input)),
  date(),
)
