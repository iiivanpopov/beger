import type { ReactNode } from 'react'
import type { ButtonProps } from '../Button/Button'
import { CheckIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '../Button/Button'

export interface ConfirmableButtonProps extends ButtonProps {
  children: ReactNode
}

export function ConfirmableButton({ children, onClick, ...props }: ConfirmableButtonProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null!)

  useEffect(() => {
    const ref = timeoutRef
    return () => clearTimeout(ref.current)
  }, [])

  if (isConfirming) {
    return (
      <Button
        {...props}
        onClick={(e) => {
          onClick?.(e)
          setIsConfirming(false)
        }}
      >
        {props.icon && <CheckIcon />}
        {!props.icon && 'Confirm?'}
      </Button>
    )
  }

  return (
    <Button
      {...props}
      onClick={() => {
        timeoutRef.current = setTimeout(() => {
          setIsConfirming(false)
        }, 2000)
        setIsConfirming(true)
      }}
    >
      {children}
    </Button>
  )
}
