import { createFileRoute } from '@tanstack/react-router'
import { TestResultsPage } from '@/pages/TestResults/TestResultsPage'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/test-results')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: TestResultsPage,
})
