export type { Repair, TestResult, User, UserRole } from '@/database'
export type { LoginData } from '@/modules/auth/schemas/login.schema'
export type { RegisterData } from '@/modules/auth/schemas/register.schema'
export type { CreateRepairData } from '@/modules/repairs/schemas/create-repair.schema'
export type { CreateTestResultData } from '@/modules/test-results/schemas/create-test-result.schema'
export type { UpdateUserData } from '@/modules/users/schemas/update-user.schema'
export type { PaginationData, PaginationMeta } from '@/utils'
export interface Tokens {
  accessToken: string
  refreshToken: string
}
