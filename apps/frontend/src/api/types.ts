import type { CreateRepairData, CreateTestResultData, PaginationData, PaginationMeta, RegisterData, Repair, TestResult, Tokens, UpdateUserData, User } from '@beger/shared'
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import type { HTTPError, Options } from 'ky'
import type { LoginData } from '@/routes/(guest)/login/-schemas/LoginSchema'
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

// Auth
export interface LoginPayload {
  body: LoginData
}

export type LoginResponse = ApiResponse<{
  tokens: Tokens
  user: User
}>

export interface RegisterPayload {
  body: RegisterData
}

export type RegisterResponse = ApiResponse<User>

export type RefreshResponse = ApiResponse<Tokens>

export type LogoutResponse = ApiSuccess

// Users
export type GetSelfUserResponse = ApiResponse<User>

export interface GetUsersPayload {
  query: PaginationData
}

export type GetUsersResponse = ApiResponse<{
  users: User[]
  meta: PaginationMeta
}>

export interface UpdateUserPayload {
  params: { id: number }
  body: UpdateUserData
}
export type UpdateUserResponse = ApiResponse<User>

export interface DeleteUserPayload {
  params: { id: number }
}
export type DeleteUserResponse = ApiSuccess

// Repairs
export type GetSelfRepairsResponse = ApiResponse<Repair[]>

export interface GetRepairsPayload {
  query: PaginationData
}
export type GetRepairsResponse = ApiResponse<{ repairs: Repair[], meta: PaginationMeta }>

export interface CreateRepairPayload {
  body: CreateRepairData
}
export type CreateRepairResponse = ApiResponse<Repair>

export interface DeleteRepairPayload {
  params: { id: number }
}
export type DeleteRepairResponse = ApiSuccess

// Test Results
export type GetSelfTestResults = ApiResponse<TestResult[]>

export interface GetTestResultsPayload {
  query: PaginationData
}
export type GetTestResultsResponse = ApiResponse<{
  testResults: TestResult[]
  meta: PaginationMeta
}>

export interface CreateTestResultPayload {
  body: CreateTestResultData
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
