import type { DeleteTestResultParams } from '@/api/requests/test-results'
import type { MutationSettings } from '@/api/types'
import { useMutation } from '@tanstack/react-query'
import { deleteTestResult } from '@/api/requests/test-results'

export function useDeleteTestResultMutation(
  settings?: MutationSettings<DeleteTestResultParams, typeof deleteTestResult>,
) {
  return useMutation({
    mutationKey: ['test-results'],
    mutationFn: params => deleteTestResult({ params }),
    ...settings?.options,
  })
}
