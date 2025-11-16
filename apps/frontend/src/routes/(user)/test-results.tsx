import { createFileRoute } from '@tanstack/react-router'
import { getOptionsQueryOptions } from '@/api'
import { I18nText } from '@/components'
import { TestResultsPage } from '@/pages/TestResults/TestResultsPage'
import { queryClient } from '@/providers'
import { Typography } from '@/shared/ui'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/test-results')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: TestResultsPage,
  loader: () => queryClient.ensureQueryData(getOptionsQueryOptions),
  pendingComponent: () => (
    <Typography>
      <I18nText>message.loading-test-results</I18nText>
    </Typography>
  ),
})
