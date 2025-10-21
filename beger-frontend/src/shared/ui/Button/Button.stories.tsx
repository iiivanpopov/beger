import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchIcon } from 'lucide-react'
import { Button } from './Button'

const meta = {
  component: Button,
  title: 'UI/Button',
  argTypes: {
    variant: { control: 'radio', options: ['contained', 'ghost'] },
    color: { control: 'radio', options: ['primary', 'white'] },
    size: { control: 'radio', options: ['small', 'medium'] },
    icon: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>

type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    children: 'Button',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    color: 'primary',
    children: 'Button',
  },
}

export const Icon: Story = {
  args: {
    'variant': 'contained',
    'color': 'primary',
    'children': <SearchIcon />,
    'icon': true,
    'aria-label': 'Search',
  },
}

export const Small: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    size: 'small',
    children: 'Small Button',
  },
}

export const Loading: Story = {
  args: {
    variant: 'contained',
    color: 'primary',
    loading: true,
    children: 'Loading...',
  },
}

export default meta
