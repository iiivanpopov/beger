import { createFileRoute } from '@tanstack/react-router'
import { redirectDefaultRoute } from '@/shared/utils/routing'

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => redirectDefaultRoute(context.role),
})
