import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, UserIcon } from 'lucide-react'
import { useState } from 'react'
import { Dropdown } from './Dropdown'

const meta: Meta<typeof Dropdown> = {
  title: 'UI/Dropdown',
  component: Dropdown,
}

type Story = StoryObj<typeof Dropdown>

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('Option 1')
    return (
      <Dropdown value={value} onChange={setValue}>
        <Dropdown.Trigger />
        <Dropdown.Items>
          <Dropdown.Item value="Option 1">Option 1</Dropdown.Item>
          <Dropdown.Item value="Option 2">Option 2</Dropdown.Item>
          <Dropdown.Item value="Option 3">Option 3</Dropdown.Item>
        </Dropdown.Items>
      </Dropdown>
    )
  },
}

export const WithIcons: Story = {
  render: () => {
    const [value, setValue] = useState('user')
    return (
      <Dropdown value={value} onChange={setValue} defaultIcon={UserIcon}>
        <Dropdown.Trigger />
        <Dropdown.Items>
          <Dropdown.Item value="user" icon={UserIcon}>User</Dropdown.Item>
          <Dropdown.Item value="check" icon={CheckIcon}>Checked</Dropdown.Item>
        </Dropdown.Items>
      </Dropdown>
    )
  },
}

export default meta
