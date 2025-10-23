import type { RedirectOptions, Register, RegisteredRouter } from '@tanstack/react-router'
import type { Locale } from './providers'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { ToastsProvider } from '@/providers/ToastsProvider'
import { I18nProvider } from './providers'
import { routeTree } from './routeTree.gen'
import { storageKeys } from './shared/config'
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
export type AppRouter = RegisteredRouter<Register>
export type RouterPath = RedirectOptions<AppRouter>['to']

const defaultLocale = localStorage.getItem(storageKeys.locale) as Locale | undefined ?? 'en'
localStorage.setItem(storageKeys.locale, defaultLocale)

const res = await fetch(`/locales/${defaultLocale}.json`)
const defaultMessages = await res.json()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ToastsProvider>
      <I18nProvider defaultLocale={defaultLocale} defaultMessages={defaultMessages}>
        <RouterProvider router={router} />
      </I18nProvider>
    </ToastsProvider>
  </QueryClientProvider>,
)
