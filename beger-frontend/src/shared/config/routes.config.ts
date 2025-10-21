import type { UserRole } from '@/api'
import type { RouterPath } from '@/shared/types'

export const navigationTabs: Record<
  UserRole,
  { to: RouterPath, label: string }[]
> = {
  admin: [
    { to: '/users', label: 'Users' },
    { to: '/records', label: 'Records' },
  ],
  user: [
    { to: '/test-results', label: 'Test Results' },
    { to: '/repairs', label: 'Repairs' },
  ],
  guest: [
    { to: '/login', label: 'Login' },
  ],
}
