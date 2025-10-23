import type { Options } from 'ky'
import type { CreateTestResultPayload, CreateTestResultResponse, DeleteTestResultPayload, DeleteTestResultResponse, GetSelfTestResults, GetTestResultsPayload, GetTestResultsResponse } from '@/api/types'
import { $api } from '@/api/instance'

export interface GetTestResultsConfig {
  payload: GetTestResultsPayload
  config?: Options
}

export async function getTestResults({ payload, config }: GetTestResultsConfig) {
  return $api.get<GetTestResultsResponse>('test-results', { ...config, searchParams: payload.query as any }).json()
}

export interface GetSelfTestResultsConfig {
  config?: Options
}

export async function getSelfTestResults({ config }: GetSelfTestResultsConfig = {}) {
  return $api.get<GetSelfTestResults>('test-results/me', config).json()
}

export interface CreateTestResultConfig {
  payload: CreateTestResultPayload
  config?: Options
}

export async function createTestResult({ payload, config }: CreateTestResultConfig) {
  return $api.post<CreateTestResultResponse>('test-results', { ...config, json: payload.body }).json()
}

export interface DeleteTestResultConfig {
  payload: DeleteTestResultPayload
  config?: Options
}

export async function deleteTestResult({ payload, config }: DeleteTestResultConfig) {
  return $api.delete<DeleteTestResultResponse>(`test-results/${payload.params.id}`, config).json()
}
