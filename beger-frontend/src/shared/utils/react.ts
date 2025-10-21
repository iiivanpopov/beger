import type { RefObject } from 'react'
import { createContext, use } from 'react'

export function buildContext<T>() {
  const Context = createContext<T | undefined>(undefined)

  const useContext = (): T => use(Context) as T

  return [Context, useContext] as const
}

export function collectElements<T extends HTMLElement>(
  ...sources: (T | RefObject<T> | RefObject<T>[] | Set<T> | T[] | null | undefined)[]
): T[] {
  const elements: T[] = []

  sources.forEach((source) => {
    if (!source)
      return

    if (source instanceof HTMLElement) {
      elements.push(source as T)
      return
    }

    if (source instanceof Set) {
      elements.push(...Array.from(source))
      return
    }

    if (Array.isArray(source)) {
      source.forEach((item) => {
        if (item && 'current' in item && item.current) {
          elements.push(item.current)
        }
        else if (item instanceof HTMLElement) {
          elements.push(item as T)
        }
      })
      return
    }

    if ('current' in source && source.current) {
      elements.push(source.current)
    }
  })

  return elements
}

export function getAbsoluteRect(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  return {
    top: rect.top + window.scrollY,
    left: rect.left + window.scrollX,
    right: rect.right + window.scrollX,
    bottom: rect.bottom + window.scrollY,
    width: rect.width,
    height: rect.height,
  }
}
