import { createContext } from 'react'

export type Locale = 'en' | 'uk' | 'ru'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nContextValue>(null!)
