import type { Options } from 'ky'
import type { LoginPayload, LoginResponse, LogoutResponse, RefreshResponse, RegisterPayload, RegisterResponse } from '@/api/types'
import { $api } from '@/api/instance'

export interface LoginConfig {
  payload: LoginPayload
  config?: Options
}

export async function login({ payload, config }: LoginConfig) {
  return $api.post<LoginResponse>('auth/login', { ...config, json: payload.body }).json()
}

export interface RegisterConfig {
  payload: RegisterPayload
  config?: Options
}

export async function register({ payload, config }: RegisterConfig) {
  return $api.post<RegisterResponse>('auth/register', { ...config, json: payload.body }).json()
}

export interface LogoutConfig {
  config?: Options
}

export async function logout({ config }: LogoutConfig = {}) {
  return $api.post<LogoutResponse>('auth/logout', config).json()
}

export interface RefreshParams {
  config?: Options
}

export async function refresh({ config }: RefreshParams) {
  return $api.post<RefreshResponse>('auth/refresh', config).json()
}
