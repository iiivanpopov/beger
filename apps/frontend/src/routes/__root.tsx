import type { UserRole } from '@/api'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { useGetSelfUserQueryOptions } from '@/api'
import { Header } from '@/components'
import { queryClient } from '@/providers'
import { storageKeys } from '@/shared/config'
import { Layout } from '@/shared/ui/Layout'

interface RouterContext {
  role: UserRole
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async (): Promise<{ role: UserRole }> => {
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
  component: () => (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  ),
})
