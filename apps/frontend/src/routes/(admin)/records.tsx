import { createFileRoute } from '@tanstack/react-router'
import { RecordsPage } from '@/pages/Records/RecordsPage'
import { requireRole } from '@/shared/utils'

export const Route = createFileRoute('/(admin)/records')({
  beforeLoad: ({ context }) => requireRole(context.role, ['admin'], '/login'),
  component: RecordsPage,
})
