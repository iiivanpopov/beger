import type { QueryClient } from '@tanstack/react-query'
import type { UserRole } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useGetSelfUserQueryOptions } from '@/api'
import { Header } from '@/components'
import { ErrorPage } from '@/pages/Error/ErrorPage'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'
import { storageKeys } from '@/shared/config'
import { Layout } from '@/shared/ui/Layout'

interface RouterContext {
  role: UserRole
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ context }): Promise<{ role: UserRole }> => {
    const { queryClient } = context
    const token = localStorage.getItem(storageKeys.accessToken)

    if (!token)
      return { role: 'guest' }

    try {
      const user = await queryClient.fetchQuery(useGetSelfUserQueryOptions)

      return { role: user.data.role }
    }
    catch {
      localStorage.removeItem(storageKeys.accessToken)
      localStorage.removeItem(storageKeys.refreshToken)

      return { role: 'guest' }
    }
  },
  component: RootLayout,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorPage,
})

function RootLayout() {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  )
}
