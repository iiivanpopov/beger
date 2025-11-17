import type { ReactNode } from 'react'
import type { ButtonProps } from '@/shared/ui/Button/Button'
import { CheckIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/shared/ui/Button/Button'

export interface ConfirmableButtonProps extends ButtonProps {
  children: ReactNode
  label: ReactNode
}

export function ConfirmableButton({ children, onClick, label, ...props }: ConfirmableButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!)

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current)
  }, [])

  if (isConfirming) {
    return (
      <Button
        {...props}
        onClick={(e) => {
          setIsConfirming(false)
          onClick?.(e)
        }}
      >
        {props.icon && <CheckIcon />}
        {!props.icon && label}
      </Button>
    )
  }

  return (
    <Button
      {...props}
      onClick={() => {
        setIsConfirming(true)
        timeoutRef.current = setTimeout(() => setIsConfirming(false), 2000)
      }}
    >
      {children}
    </Button>
  )
}
