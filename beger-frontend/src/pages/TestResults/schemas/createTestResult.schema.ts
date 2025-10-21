import * as v from 'valibot'
import { pcbNameValidator } from '@/shared/utils'

export const CreateTestResultSchema = v.object({
  pcbName: pcbNameValidator,
  date: v.date(),
  firstTry: v.pipe(v.string(), v.nonEmpty('* Required')),
  failed: v.pipe(v.string(), v.nonEmpty('* Required')),
  total: v.pipe(v.string(), v.nonEmpty('* Required')),
})

export type CreateTestResultData = v.InferOutput<typeof CreateTestResultSchema>
