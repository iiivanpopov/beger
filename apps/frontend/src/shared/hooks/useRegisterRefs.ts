import { useCallback, useRef } from 'react'

export function useRegisterRefs<T extends HTMLElement = HTMLElement>() {
  const refs = useRef<Set<T>>(new Set())

  const registerRef = useCallback((el: T | null) => {
    if (el)
      refs.current.add(el)
  }, [])

  return { refs, registerRef }
}
