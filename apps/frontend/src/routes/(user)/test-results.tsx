import { createFileRoute } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { getOptionsQueryOptions } from '@/api'
import { TestResultsPage } from '@/pages/TestResults/TestResultsPage'
import { Typography } from '@/shared/ui'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/test-results')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: TestResultsPage,
  loader: ({ context }) => context.queryClient.ensureQueryData(getOptionsQueryOptions),
  pendingComponent: () => <Typography><FormattedMessage id="message.loading-test-results" /></Typography>,
})
