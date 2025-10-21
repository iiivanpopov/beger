import type { CreateRepairParams } from '@/api/requests/repairs'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { createRepair } from '@/api/requests/repairs'

export function useCreateRepairMutation(
  settings?: MutationSettings<CreateRepairParams, typeof createRepair>,
) {
  return useMutation({
    mutationKey: ['repairs'],
    mutationFn: params => createRepair({ params }),
    ...settings?.options,
  })
}
