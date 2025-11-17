import { useState } from 'react'

export function useDisclosure(initialState: boolean = false) {
  const [isOpen, setIsOpen] = useState(initialState)

  return {
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(current => !current),
    setIsOpen,
    isOpen,
  }
}
