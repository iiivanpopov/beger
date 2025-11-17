import { createFileRoute } from '@tanstack/react-router'
import { Page } from './-page'

export const Route = createFileRoute('/(guest)/login')({
  component: Page,
})
