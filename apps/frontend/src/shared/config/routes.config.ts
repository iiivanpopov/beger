import type { UserRole } from '@beger/shared'
import type { RouterPath } from '@/main'

export const navigationTabs: Record<
  UserRole,
  { to: RouterPath, label: string }[]
> = {
  admin: [
    { to: '/users', label: 'tab.users' },
  ],
  user: [
    { to: '/test-results', label: 'tab.test-results' },
    { to: '/repairs', label: 'tab.repairs' },
  ],
  guest: [
    { to: '/login', label: 'tab.login' },
  ],
}
