import type { Options } from 'ky'
import type { DeleteUserResponse, GetCurrentUserResponse, GetUsersResponse, PaginationQuery, UpdateUserBody, UpdateUserResponse } from '@/api/types'
import { $api } from '@/api/instance'

export type GetUsersParams = PaginationQuery
export interface UpdateUserParams extends UpdateUserBody {
  id: number
}
export interface DeleteUserParams {
  id: number
}

export async function getCurrentUser(config?: Options) {
  return $api.get<GetCurrentUserResponse>('users/me', {
    ...config,
  }).json()
}

export async function getUsers({ params, config }: { params?: GetUsersParams, config?: Options } = {}) {
  return $api.get<GetUsersResponse>(`users`, {
    searchParams: { page: params?.page, limit: params?.limit },
    ...config,
  }).json()
}

export async function updateUser({ params, config }: { params: UpdateUserParams, config?: Options }) {
  return $api.patch<UpdateUserResponse>(`users/${params.id}`, {
    json: params,
    ...config,
  }).json()
}

export async function deleteUser({ params, config }: { params: DeleteUserParams, config?: Options }) {
  return $api.delete<DeleteUserResponse>(`users/${params.id}`, {
    ...config,
  }).json()
}
