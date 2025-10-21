import type { CreateTestResultParams } from '@/api/requests/test-results'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { createTestResult } from '@/api/requests/test-results'

export function useCreateTestResultMutation(
  settings?: MutationSettings<CreateTestResultParams, typeof createTestResult>,
) {
  return useMutation({
    mutationKey: ['test-results'],
    mutationFn: params => createTestResult({ params }),
    ...settings?.options,
  })
}
