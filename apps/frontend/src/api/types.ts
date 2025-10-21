import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { HTTPError } from 'ky'
import type { AnyFunction } from '@/shared/types'

export interface QuerySettings<
  Func extends AnyFunction = AnyFunction,
  Select = Awaited<ReturnType<Func>>,
> {
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<Func>>,
      HTTPError<ApiError>,
      Select,
      any
    >,
    'queryKey'
  >
}

export interface MutationSettings<Params = void, Func extends AnyFunction = AnyFunction> {
  options?: UseMutationOptions<
    Awaited<ReturnType<Func>>,
    HTTPError<ApiError>,
    Params,
    any
  >
}

export interface ApiError {
  message: string
  success: false
}

export interface ApiResponse<T> {
  data: T
  success: true
}

export interface ApiSuccess {
  success: true
}

export type UserRole = 'admin' | 'user' | 'guest'

export interface User {
  id: number
  fullName: string
  userName: string
  role: UserRole
  createdAt: Date
}

export interface Repair {
  id: number
  userId: number | null
  pcbName: string
  defect: string
  note: string | null
  date: Date
  createdAt: Date
}

export interface TestResult {
  id: number
  userId: number | null
  pcbName: string
  passedFirstTry: number
  failed: number
  total: number
  date: Date
  createdAt: Date
}

export interface Tokens {
  accessToken: string
  refreshToken: string
}

export interface PaginationQuery {
  page: number
  limit: number
}

export interface PaginationMeta {
  pages: number
  page: number
  total: number
}

export interface LoginBody {
  userName: string
  password: string
}

export type LoginResponse = ApiResponse<{
  tokens: Tokens
  user: User
}>

export interface RegisterBody {
  userName: string
  password: string
  fullName: string
}

export type RegisterResponse = ApiResponse<User>

export type LogoutResponse = ApiSuccess

export type RefreshResponse = ApiResponse<Tokens>

export type GetCurrentUserResponse = ApiResponse<User>

export type GetUsersResponse = ApiResponse<{ users: User[], meta: PaginationMeta }>

export interface UpdateUserBody {
  userName?: string
  fullName?: string
  password?: string
}

export type UpdateUserResponse = ApiResponse<User>

export type DeleteUserResponse = ApiSuccess

export type GetSelfRepairsResponse = ApiResponse<Repair[]>

export type GetRepairsResponse = ApiResponse<{ repairs: Repair[], meta: PaginationMeta }>

export interface CreateRepairBody {
  pcbName: string
  defect: string
  note?: string | null
  date: Date
}

export type CreateRepairResponse = ApiResponse<Repair>

export type DeleteRepairResponse = ApiSuccess

export type GetSelfTestResults = ApiResponse<TestResult[]>

export type GetTestResultsResponse = ApiResponse<{ testResults: TestResult[], meta: PaginationMeta }>

export interface CreateTestResultBody {
  pcbName: string
  passedFirstTry: number
  failed: number
  total: number
  date: Date
}

export type CreateTestResultResponse = ApiResponse<TestResult>

export type DeleteTestResultResponse = ApiSuccess

export type GetOptionsResponse = ApiResponse<{
  pcbNames: string[]
  defects: string[]
}>
