import type { MouseEvent, ReactNode, RefObject } from 'react'
import { cloneElement, isValidElement } from 'react'

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

export function cloneComponent(element: ReactNode, props: Record<string, any>) {
  if (!isValidElement(element))
    return element

  return cloneElement(element, {
    ...props,
    onClick: (e: MouseEvent) => {
      (element.props as any).onClick?.(e)
      props.onClick?.(e)
    },
  } as any)
}
