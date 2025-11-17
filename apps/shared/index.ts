import type { User as UserEntity } from '@beger/backend'

export type User = Omit<UserEntity, 'passwordHash'>
export type { CreateRepairData, CreateTestResultData, LoginData, PaginationData, PaginationMeta, RegisterData, Repair, TestResult, Tokens, UpdateUserData, UserRole } from '@beger/backend'
