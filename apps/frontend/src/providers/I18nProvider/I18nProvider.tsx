import type { ReactNode } from 'react'
import type { Locale } from './I18nContext'
import { useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { I18nContext } from './I18nContext'

export interface I18nProviderProps {
  defaultLocale: Locale
  defaultMessages: Record<string, string>
  children: ReactNode
}

export function I18nProvider({ defaultLocale, defaultMessages, children }: I18nProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [messages, setMessages] = useState<Record<string, string>>(defaultMessages)

  const contextValue = useMemo(() => ({
    locale,
    setLocale: async (newLocale: Locale) => {
      const res = await fetch(`/locales/${newLocale}.json`)
      const newMessages = await res.json()
      setMessages(newMessages)
      setLocale(newLocale)
    },
  }), [locale])

  return (
    <I18nContext value={contextValue}>
      <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={messages}>
        {children}
      </IntlProvider>
    </I18nContext>
  )
}
