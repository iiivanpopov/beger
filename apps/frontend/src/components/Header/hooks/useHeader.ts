import { useLocation, useNavigate, useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useLogoutMutation } from '@/api'
import { storageKeys } from '@/shared/config'

export function useHeader() {
  const navigate = useNavigate()
  const { queryClient, role } = useRouteContext({ from: '__root__' })
  const pathname = useLocation({ select: state => state.pathname })
  const [isOpen, setIsOpen] = useState(false)

  const logoutMutation = useLogoutMutation({
    options: {
      onSuccess: () => {
        setIsOpen(false)
        localStorage.removeItem(storageKeys.accessToken)
        localStorage.removeItem(storageKeys.refreshToken)
        queryClient.removeQueries({ queryKey: ['user', 'self'] })
        navigate({ to: '/login', replace: true })
      },
    },
  })

  const onLogout = () => logoutMutation.mutate()

  return {
    actions: {
      onLogout,
    },
    ui: {
      menu: {
        isOpen,
        setIsOpen,
      },
    },
    data: {
      role,
      pathname,
    },
  }
}
