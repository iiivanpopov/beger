import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { HTTPError, Options } from 'ky'
import type { AnyFunction } from '@/shared/types'

export interface QuerySettings<
  Func extends AnyFunction = AnyFunction,
> {
  options?: Omit<
    UseQueryOptions<
      Awaited<ReturnType<Func>>,
      HTTPError<ApiError>,
      Awaited<ReturnType<Func>>,
      any
    >,
    'queryKey' | 'queryFn'
  >
  config?: Options
}

export interface MutationSettings<Params = void, Func extends AnyFunction = AnyFunction> {
  options?: Omit<
    UseMutationOptions<
      Awaited<ReturnType<Func>>,
      HTTPError<ApiError>,
      Params,
      any
    >,
    'mutationKey' | 'mutationFn'
  >
  config?: Options
}

export interface ApiResponse<T> {
  data: T
  success: true
}

export interface ApiError {
  message: string
  success: false
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
  firstTry: number
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

// Auth
export interface LoginPayload {
  body: { userName: string, password: string }
}

export type LoginResponse = ApiResponse<{
  tokens: Tokens
  user: User
}>

export interface RegisterPayload {
  body: { userName: string, password: string, fullName: string }
}

export type RegisterResponse = ApiResponse<User>

export interface RefreshPayload {
  body: { refreshToken: string }
}

export type RefreshResponse = ApiResponse<Tokens>

export type LogoutResponse = ApiSuccess

// Users
export type GetSelfUserResponse = ApiResponse<User>

export interface GetUsersPayload {
  query: PaginationQuery
}
export type GetUsersResponse = ApiResponse<{
  users: User[]
  meta: PaginationMeta
}>

export interface UpdateUserPayload {
  params: {
    id: number
  }
  body: {
    userName?: string
    fullName?: string
    password?: string
  }
}
export type UpdateUserResponse = ApiResponse<User>

export interface DeleteUserPayload {
  params: {
    id: number
  }
}
export type DeleteUserResponse = ApiSuccess

// Repairs
export type GetSelfRepairsResponse = ApiResponse<Repair[]>

export interface GetRepairsPayload {
  query: PaginationQuery
}
export type GetRepairsResponse = ApiResponse<{ repairs: Repair[], meta: PaginationMeta }>

export interface CreateRepairPayload {
  body: {
    pcbName: string
    defect: string
    note?: string | null
    date: Date
  }
}
export type CreateRepairResponse = ApiResponse<Repair>

export interface DeleteRepairPayload {
  params: { id: number }
}
export type DeleteRepairResponse = ApiSuccess

// Test Results
export type GetSelfTestResults = ApiResponse<TestResult[]>

export interface GetTestResultsPayload {
  query: PaginationQuery
}
export type GetTestResultsResponse = ApiResponse<{
  testResults: TestResult[]
  meta: PaginationMeta
}>

export interface CreateTestResultPayload {
  body: { pcbName: string, firstTry: number, failed: number, total: number, date: Date }
}
export type CreateTestResultResponse = ApiResponse<TestResult>

export interface DeleteTestResultPayload {
  params: { id: number }
}
export type DeleteTestResultResponse = ApiSuccess

// Options
export type GetOptionsResponse = ApiResponse<{
  pcbNames: string[]
  defects: string[]
}>
