import type { QueryClient } from '@tanstack/react-query'
import type { UserRole } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { getCurrentUser } from '@/api/requests/users'
import { Layout } from '@/components/Layout'
import { NotFoundPage } from '@/pages/NotFound/NotFoundPage'
import { storageKeys } from '@/shared/config'

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
      const user = await queryClient.fetchQuery({
        queryKey: ['user', 'self'],
        queryFn: async () => {
          const res = await getCurrentUser()
          return res
        },
        staleTime: 5 * 60 * 1000,
      })

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
})

function RootLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
