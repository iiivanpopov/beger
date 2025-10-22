import type { RefObject } from 'react'
import type { ClickEvent } from '@/shared/types'
import { useEffect, useEffectEvent } from 'react'
import { collectElements } from '@/shared/utils'
import { useRegisterRefs } from './useRegisterRefs'

export function useClickOutside(
  callback: (event: ClickEvent) => void,
  externalRef?: RefObject<HTMLElement> | RefObject<HTMLElement>[],
) {
  const { refs, registerRef } = useRegisterRefs<HTMLElement>()

  const handleClick = useEffectEvent((e: ClickEvent) => {
    const target = e.target as HTMLElement
    const elements = collectElements(refs.current, externalRef)

    if (!elements.some(el => el === target || el.contains(target)))
      callback(e)
  })

  useEffect(() => {
    document.addEventListener('click', handleClick)
    document.addEventListener('touchstart', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  }, [refs, externalRef])

  return registerRef
}
