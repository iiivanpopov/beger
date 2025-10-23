import type { Options } from 'ky'
import type { DeleteUserPayload, DeleteUserResponse, GetSelfUserResponse, GetUsersPayload, GetUsersResponse, UpdateUserPayload, UpdateUserResponse } from '@/api/types'
import { $api } from '@/api/instance'

export interface GetSelfUserConfig {
  config?: Options
}

export async function getSelfUser({ config }: GetSelfUserConfig = {}) {
  return $api.get<GetSelfUserResponse>('users/me', config).json()
}

export interface GetUsersConfig {
  payload: GetUsersPayload
  config?: Options
}

export async function getUsers({ payload, config }: GetUsersConfig) {
  return $api.get<GetUsersResponse>('users', { ...config, searchParams: payload.query as any }).json()
}

export interface UpdateUserConfig {
  payload: UpdateUserPayload
  config?: Options
}

export async function updateUser({ payload, config }: UpdateUserConfig) {
  return $api.patch<UpdateUserResponse>(`users/${payload.params.id}`, { ...config, json: payload.body }).json()
}

export interface DeleteUserConfig {
  payload: DeleteUserPayload
  config?: Options
}

export async function deleteUser({ payload, config }: DeleteUserConfig) {
  return $api.delete<DeleteUserResponse>(`users/${payload.params.id}`, config).json()
}
