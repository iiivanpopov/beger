import { createFileRoute } from '@tanstack/react-router'
import * as v from 'valibot'
import { getUsersQueryOptions } from '@/api'
import { queryClient } from '@/providers'
import { requireRole } from '@/shared/utils'
import { Page } from './-page'

const RouteSearchSchema = v.object({
  page: v.optional(v.fallback(v.pipe(v.number(), v.toMinValue(1)), 1), 1),
})

export const Route = createFileRoute('/(admin)/users')({
  beforeLoad: ({ context }) => requireRole(context.role, ['admin'], '/login'),
  component: Page,
  validateSearch: RouteSearchSchema,
  loader: ({ location }) => queryClient.ensureQueryData(getUsersQueryOptions({
    query: { limit: 5, page: 1, ...location.search },
  })),
})
