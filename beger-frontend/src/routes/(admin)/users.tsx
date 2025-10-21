import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { UsersPage } from '@/pages/Users/UsersPage'
import { requireRole } from '@/shared/utils'

export const Route = createFileRoute('/(admin)/users')({
  beforeLoad: ({ context }) => requireRole(context.role, ['admin'], '/login'),
  component: UsersPage,
  validateSearch: v.object({ page: v.optional(v.fallback(v.number(), 1), 1) }),
})
