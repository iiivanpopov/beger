import type { Options } from 'ky'
import type { LoginBody, LoginResponse, LogoutResponse, RefreshResponse, RegisterBody, RegisterResponse } from '@/api/types'
import { $api } from '@/api/instance'

export type LoginParams = LoginBody
export type RegisterParams = RegisterBody
export interface RefreshParams {
  refreshToken: string
}

export async function login({ params, config }: { params: LoginParams, config?: Options }) {
  return $api.post<LoginResponse>('auth/login', {
    json: params,
    ...config,
  }).json()
}

export async function register({ params, config }: { params: RegisterParams, config?: Options }) {
  return $api.post<RegisterResponse>('auth/register', {
    json: params,
    ...config,
  }).json()
}

export async function logout({ config }: { config?: Options } = {}) {
  return $api.post<LogoutResponse>('auth/logout', {
    ...config,
  }).json()
}

export async function refresh({ params, config }: { params: RefreshParams, config?: Options }) {
  return $api.post<RefreshResponse>('auth/refresh', {
    json: params,
    ...config,
  }).json()
}
