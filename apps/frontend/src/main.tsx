import type { RedirectOptions, Register, RegisteredRouter } from '@tanstack/react-router'
import type { Locale } from './providers'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { createRoot } from 'react-dom/client'
import { ToastsProvider } from '@/providers/ToastsProvider'
import { I18nProvider } from './providers'
import { QueryProvider } from './providers/QueryProvider'
import { routeTree } from './routeTree.gen'
import { storageKeys } from './shared/config'
import { loadLocale } from './shared/utils/i18n'
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
