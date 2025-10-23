import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { ToastsProvider } from '@/providers/ToastsProvider'
import { routeTree } from './routeTree.gen'
import '@/styles/globals.css'

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  notFoundMode: 'root',
  context: {
    role: 'guest',
    queryClient,
  },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastsProvider>
      <RouterProvider router={router} />
    </ToastsProvider>
  </QueryClientProvider>,
)
