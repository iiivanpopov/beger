import { createFileRoute } from '@tanstack/react-router'
import { RepairsPage } from '@/pages/Repairs/RepairsPage'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/repairs')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: RepairsPage,
})
