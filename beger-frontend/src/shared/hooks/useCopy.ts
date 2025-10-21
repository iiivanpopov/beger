import { useCallback, useState } from 'react'

export function useCopy(delay = 2000) {
  const [isCopied, setCopied] = useState(false)

  const copy = useCallback(async (text: string, callback?: () => void) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    callback?.()
    const timeout = setTimeout(() => setCopied(false), delay)
    return () => clearInterval(timeout)
  }, [delay])

  return { copy, isCopied }
}
