import type { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export function useControllableState<T>(
  [state, setState]: [T | undefined, Dispatch<SetStateAction<T>> | undefined],
  initialValue: T,
) {
  const internal = useState<T>(initialValue)

  if (state && setState)
    return [state, setState] as const

  return internal
}
