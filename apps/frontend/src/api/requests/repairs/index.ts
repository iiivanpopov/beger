import type { Options } from 'ky'
import type { CreateRepairPayload, CreateRepairResponse, DeleteRepairPayload, DeleteRepairResponse, GetRepairsPayload, GetRepairsResponse, GetSelfRepairsResponse } from '@/api/types'
import { $api } from '@/api/instance'

export interface GetRepairsConfig {
  payload: GetRepairsPayload
  config?: Options
}

export async function getRepairs({ payload, config }: GetRepairsConfig) {
  return $api.get<GetRepairsResponse>('repairs', { ...config, searchParams: payload.query as any }).json()
}

export interface GetSelfRepairsConfig {
  config?: Options
}

export async function getSelfRepairs({ config }: GetSelfRepairsConfig = {}) {
  return $api.get<GetSelfRepairsResponse>('repairs/me', config).json()
}

export interface CreateRepairConfig {
  payload: CreateRepairPayload
  config?: Options
}

export async function createRepair({ payload, config }: CreateRepairConfig) {
  return $api.post<CreateRepairResponse>('repairs', { ...config, json: payload.body }).json()
}

export interface DeleteRepairConfig {
  payload: DeleteRepairPayload
  config?: Options
}

export async function deleteRepair({ payload: params, config }: DeleteRepairConfig) {
  return $api.delete<DeleteRepairResponse>(`repairs/${params.params.id}`, config).json()
}
