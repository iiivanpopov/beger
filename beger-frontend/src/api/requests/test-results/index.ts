import type { Options } from 'ky'
import type { CreateTestResultBody, CreateTestResultResponse, DeleteTestResultResponse, GetSelfTestResults, GetTestResultsResponse, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetTestResultsParams = PaginationQuery
export type CreateTestResultParams = CreateTestResultBody
export interface DeleteTestResultParams {
  id: number
}

export async function getTestResults({ params, config }: { params?: GetTestResultsParams, config?: Options } = {}) {
  return $api.get<GetTestResultsResponse>(`test-results`, {
    searchParams: { page: params?.page, limit: params?.limit },
    ...config,
  }).json()
}

export async function getSelfTestResults({ config }: { config?: Options } = {}) {
  return $api.get<GetSelfTestResults>(`test-results/me`, {
    ...config,
  }).json()
}

export async function createTestResult({ params, config }: { params: CreateTestResultParams, config?: Options }) {
  return $api.post<CreateTestResultResponse>('test-results', {
    json: params,
    ...config,
  }).json()
}

export async function deleteTestResult({ params, config }: { params: DeleteTestResultParams, config?: Options }) {
  return $api.delete<DeleteTestResultResponse>(`test-results/${params.id}`, {
    ...config,
  }).json()
}
