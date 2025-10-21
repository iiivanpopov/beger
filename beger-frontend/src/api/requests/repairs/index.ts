import type { Options } from 'ky'
import type { CreateRepairBody, CreateRepairResponse, DeleteRepairResponse, GetRepairsResponse, GetSelfRepairsResponse, PaginationQuery } from '@/api/types'
import { $api } from '@/api/instance'

export type GetRepairsParams = PaginationQuery
export type CreateRepairParams = CreateRepairBody
export interface DeleteRepairParams {
  id: number
}

export async function getRepairs({ params, config }: { params?: GetRepairsParams, config?: Options } = {}) {
  return $api.get<GetRepairsResponse>(`repairs`, {
    searchParams: { page: params?.page, limit: params?.limit },
    ...config,
  }).json()
}

export async function getSelfRepairs({ config }: { config?: Options } = {}) {
  return $api.get<GetSelfRepairsResponse>(`repairs/me`, {
    ...config,
  }).json()
}

export async function createRepair({ params, config }: { params: CreateRepairParams, config?: Options }) {
  return $api.post<CreateRepairResponse>('repairs', {
    json: params,
    ...config,
  }).json()
}

export async function deleteRepair({ params, config }: { params: DeleteRepairParams, config?: Options }) {
  return $api.delete<DeleteRepairResponse>(`repairs/${params.id}`, {
    ...config,
  }).json()
}
