import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { getUsersQueryOptions } from '@/api'
import { UsersPage } from '@/pages/Users/UsersPage'
import { requireRole } from '@/shared/utils'

export const Route = createFileRoute('/(admin)/users')({
  beforeLoad: ({ context }) => requireRole(context.role, ['admin'], '/login'),
  component: UsersPage,
  validateSearch: v.object({ page: v.optional(v.fallback(v.pipe(v.number(), v.toMinValue(1)), 1), 1) }),
  loader: ({ context, location }) => context.queryClient.ensureQueryData(getUsersQueryOptions({ limit: 5, page: 1, ...location.search })), // ...location.search instead of location.search.page cuz typescript
})
