import type { InferOutput } from 'valibot'
import { minValue, number, object, pipe } from 'valibot'
import { dateValidation, pcbNameValidation } from '@/utils'

export const CreateTestResultBody = object({
  pcbName: pcbNameValidation,
  passedFirstTry: pipe(number(), minValue(0)),
  failed: pipe(number(), minValue(0)),
  total: pipe(number(), minValue(0)),
  date: dateValidation,
})

export type CreateTestResultData = InferOutput<typeof CreateTestResultBody>
