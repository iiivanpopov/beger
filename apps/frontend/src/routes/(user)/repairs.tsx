import { createFileRoute } from '@tanstack/react-router'
import { getOptionsQueryOptions } from '@/api'
import { I18nText } from '@/components'
import { RepairsPage } from '@/pages/Repairs/RepairsPage'
import { queryClient } from '@/providers'
import { Typography } from '@/shared/ui'
import { requireRole } from '@/shared/utils/routing'

export const Route = createFileRoute('/(user)/repairs')({
  beforeLoad: ({ context }) => requireRole(context.role, ['user'], '/login'),
  component: RepairsPage,
  loader: () => queryClient.ensureQueryData(getOptionsQueryOptions),
  pendingComponent: () => (
    <Typography>
      <I18nText>message.loading-repairs</I18nText>
    </Typography>
  ),
})
