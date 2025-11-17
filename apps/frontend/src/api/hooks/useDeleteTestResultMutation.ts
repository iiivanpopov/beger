import type { DeleteTestResultConfig } from '@/api/requests/test-results'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteTestResult } from '@/api/requests/test-results'

export function useDeleteTestResultMutation(
  settings?: MutationSettings<DeleteTestResultConfig, typeof deleteTestResult>,
) {
  return useMutation({
    mutationKey: ['deleteTestResult'],
    mutationFn: ({ payload, config }) => deleteTestResult({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
