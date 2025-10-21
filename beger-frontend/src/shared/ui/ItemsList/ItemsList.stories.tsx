import type { Meta, StoryObj } from '@storybook/react-vite'
import { CheckIcon, UserIcon } from 'lucide-react'
import { ItemsList } from './ItemsList'

const meta: Meta<typeof ItemsList> = {
  title: 'UI/ItemsList',
  component: ItemsList,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <ItemsList>
      <ItemsList.Item>Option 1</ItemsList.Item>
      <ItemsList.Item>Option 2</ItemsList.Item>
      <ItemsList.Item>Option 3</ItemsList.Item>
    </ItemsList>
  ),
}

export const WithActiveItem: Story = {
  render: () => (
    <ItemsList>
      <ItemsList.Item>Option 1</ItemsList.Item>
      <ItemsList.Item active>Active Option</ItemsList.Item>
      <ItemsList.Item>Option 3</ItemsList.Item>
    </ItemsList>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <ItemsList>
      <ItemsList.Item icon={UserIcon}>User</ItemsList.Item>
      <ItemsList.Item icon={CheckIcon} active>
        Checked
      </ItemsList.Item>
    </ItemsList>
  ),
}

export default meta
