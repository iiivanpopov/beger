import type { UserRole } from '@/api'
import { redirect } from '@tanstack/react-router'

export function requireRole(current: UserRole, allowed: UserRole[], redirectTo: string) {
  if (current === 'guest')
    throw redirect({ to: '/login' })
  if (!allowed.includes(current))
    throw redirect({ to: redirectTo })
}

export function redirectDefaultRoute(role: UserRole) {
  if (role === 'user')
    throw redirect({ to: '/test-results' })
  if (role === 'admin')
    throw redirect({ to: '/users' })
  throw redirect({ to: '/login' })
}
