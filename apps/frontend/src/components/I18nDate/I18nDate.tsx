import { useI18n } from '@/shared/hooks'

export interface I18nDateProps {
  children: string | Date | number
}

export function I18nDate({ children }: I18nDateProps) {
  const { td } = useI18n()

  if (!children)
    return null

  return td(children)
}
