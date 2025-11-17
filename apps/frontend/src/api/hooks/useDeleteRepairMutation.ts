import type { DeleteRepairConfig } from '@/api/requests/repairs'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteRepair } from '@/api/requests/repairs'

export function useDeleteRepairMutation(
  settings?: MutationSettings<DeleteRepairConfig, typeof deleteRepair>,
) {
  return useMutation({
    mutationKey: ['deleteRepair'],
    mutationFn: ({ payload, config }) => deleteRepair({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
