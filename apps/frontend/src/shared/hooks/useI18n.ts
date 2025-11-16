import { useIntl } from 'react-intl'

export function useI18n() {
  const intl = useIntl()

  function td(date: Date | number | string): string {
    return intl.formatDate(date)
  }

  function t(strings: TemplateStringsArray | string, ...values: unknown[]): string {
    if (strings?.length === 0 || !strings)
      return ''

    if (!Array.isArray(strings) && typeof strings === 'string')
      return intl.formatMessage({ id: strings })

    const id = strings.reduce((acc, str, i) => acc + str + (values[i] ?? ''), '')
    return intl.formatMessage({ id })
  }

  return { t, td }
}
