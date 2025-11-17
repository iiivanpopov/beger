import type { RedirectOptions, Register, RegisteredRouter } from '@tanstack/react-router'
import type { Locale } from '@/providers'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { I18nProvider, QueryProvider, ToastsProvider } from '@/providers'
import { storageKeys } from '@/shared/config'
import { loadLocale } from '@/shared/utils'
import { routeTree } from './routeTree.gen'
import '@/styles/globals.css'

const router = createRouter({
  routeTree,
  notFoundMode: 'root',
  context: {
    role: 'guest',
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
const defaultMessages = await loadLocale(defaultLocale)

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <ToastsProvider>
      <I18nProvider defaultLocale={defaultLocale} defaultMessages={defaultMessages}>
        <RouterProvider router={router} />
      </I18nProvider>
    </ToastsProvider>
  </QueryProvider>,
)
