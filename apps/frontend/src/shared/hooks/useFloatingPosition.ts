import type { RefObject } from 'react'
import { useEffectEvent, useLayoutEffect } from 'react'
import { getAbsoluteRect } from '@/shared/utils'

export function useFloatingPosition(
  anchorRef: RefObject<HTMLElement>,
  floatingRef: RefObject<HTMLElement>,
  offset: { x: number, y: number } = { x: 0, y: 0 },
  disabled?: boolean,
) {
  const updatePosition = useEffectEvent(() => {
    const anchor = anchorRef.current
    const floating = floatingRef.current
    if (!anchor || !floating)
      return

    const anchorRect = getAbsoluteRect(anchor)
    const floatingRect = getAbsoluteRect(floating)

    let x = anchorRect.left + anchorRect.width / 2 - floatingRect.width / 2 + offset.x
    let y = anchorRect.bottom + offset.y

    x = Math.max(
      window.scrollX,
      Math.min(x, window.scrollX + window.innerWidth - floatingRect.width),
    )
    y = Math.max(
      window.scrollY,
      Math.min(y, window.scrollY + window.innerHeight - floatingRect.height),
    )

    floating.style.transform = `translate(${x}px, ${y}px)`
  })

  useLayoutEffect(() => {
    if (disabled)
      return

    updatePosition()

    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [disabled])
}
