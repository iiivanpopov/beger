import * as v from 'valibot'
import { pcbNameValidator } from '@/shared/utils'

export const CreateRepairSchema = v.object({
  pcbName: pcbNameValidator,
  defect: v.pipe(v.string(), v.nonEmpty('error.required')),
  note: v.optional(v.string()),
  date: v.date(),
})

export type CreateRepairData = v.InferOutput<typeof CreateRepairSchema>
