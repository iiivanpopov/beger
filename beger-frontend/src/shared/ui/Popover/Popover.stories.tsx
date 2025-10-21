import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/shared/ui'
import { Popover } from './Popover'

const meta: Meta<typeof Popover> = {
  title: 'UI/Popover',
  component: Popover,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
        <Popover.Trigger>Open Popover</Popover.Trigger>
        <Popover.Content style={{ padding: 20, background: '#fff', border: '1px solid #ccc', borderRadius: 4 }}>
          <p>This is basic popover content.</p>
        </Popover.Content>
      </Popover>
    )
  },
}

export const WithCustomTrigger: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Popover isOpen={isOpen} setIsOpen={setIsOpen}>
        <Popover.Trigger>
          <Button>
            Custom Button
          </Button>
        </Popover.Trigger>
        <Popover.Content style={{ padding: 15, background: '#f0f0f0', borderRadius: 8 }}>
          <h4>Popover Title</h4>
          <p>Popover with custom trigger element.</p>
        </Popover.Content>
      </Popover>
    )
  },
}

export default meta
