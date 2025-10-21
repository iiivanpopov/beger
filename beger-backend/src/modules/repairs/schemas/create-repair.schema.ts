import type { InferOutput } from 'valibot'
import { maxLength, minLength, nullable, object, optional, pipe, string } from 'valibot'
import { config } from '@/config'
import { dateValidation, pcbNameValidation } from '@/utils'

export const CreateRepairBody = object({
  pcbName: pcbNameValidation,
  defect: pipe(string(), minLength(config.validation.MIN_DEFECT_LEN)),
  note: optional(nullable(pipe(string(), maxLength(255)))),
  date: dateValidation,
})

export type CreateRepairData = InferOutput<typeof CreateRepairBody>
