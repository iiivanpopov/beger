import type { Locale } from '@/providers'
import ky from 'ky'

export async function loadLocale(locale: Locale) {
  return await ky.get(`/locales/${locale}.json`).json() as Record<string, string>
}
