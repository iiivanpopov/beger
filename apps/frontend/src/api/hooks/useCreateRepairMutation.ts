import type { CreateRepairConfig } from '@/api/requests/repairs'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { createRepair } from '@/api/requests/repairs'

export function useCreateRepairMutation(
  settings?: MutationSettings<CreateRepairConfig, typeof createRepair>,
) {
  return useMutation({
    mutationKey: ['repairs'],
    mutationFn: ({ payload, config }) => createRepair({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
