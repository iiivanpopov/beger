import type { DeleteRepairParams } from '@/api/requests/repairs'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteRepair } from '@/api/requests/repairs'

export function useDeleteRepairMutation(
  settings?: MutationSettings<DeleteRepairParams, typeof deleteRepair>,
) {
  return useMutation({
    mutationKey: ['repairs'],
    mutationFn: params => deleteRepair({ params }),
    ...settings?.options,
  })
}
