import type { CreateTestResultConfig } from '@/api/requests/test-results'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { createTestResult } from '@/api/requests/test-results'

export function useCreateTestResultMutation(
  settings?: MutationSettings<CreateTestResultConfig, typeof createTestResult>,
) {
  return useMutation({
    mutationKey: ['createTestResult'],
    mutationFn: ({ payload, config }) => createTestResult({ payload, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  })
}
