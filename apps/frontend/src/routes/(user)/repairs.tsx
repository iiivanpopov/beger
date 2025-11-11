import { createFileRoute } from '@tanstack/react-router'
import { FormattedMessage } from 'react-intl'
import { getOptionsQueryOptions } from '@/api'
import { RepairsPage } from '@/pages/Repairs/RepairsPage'
import { Typography } from '@/shared/ui'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/repairs')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: RepairsPage,
  loader: ({ context }) => context.queryClient.ensureQueryData(getOptionsQueryOptions),
  pendingComponent: () => <Typography><FormattedMessage id="message.loading-repairs" /></Typography>,
})
