import { createFileRoute } from '@tanstack/react-router'
import { getOptionsQueryOptions } from '@/api'
import { I18nText } from '@/components'
import { queryClient } from '@/providers'
import { Typography } from '@/shared/ui'
import { requireRole } from '@/shared/utils/routing'
import { Page } from './-page'

export const Route = createFileRoute('/(user)/test-results')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: Page,
  loader: () => queryClient.ensureQueryData(getOptionsQueryOptions),
  pendingComponent: () => (
    <Typography>
      <I18nText>message.loading-test-results</I18nText>
    </Typography>
  ),
})
