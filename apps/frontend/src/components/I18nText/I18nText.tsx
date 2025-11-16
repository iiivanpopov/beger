import { useI18n } from '@/shared/hooks'

export interface I18nTextProps {
  children: string
}

export function I18nText({ children }: I18nTextProps) {
  const { t } = useI18n()

  if (!children)
    return null

  return t(children)
}
