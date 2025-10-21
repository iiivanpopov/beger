import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from './Badge'

const meta = {
  component: Badge,
  title: 'UI/Badge',
  argTypes: {
    color: { control: 'radio', options: ['accent', 'black', 'white'] },
    size: { control: 'radio', options: ['small', 'medium'] },
  },
} satisfies Meta<typeof Badge>

type Story = StoryObj<typeof meta>

export const Accent: Story = {
  args: {
    color: 'accent',
    size: 'medium',
    children: 'Badge',
  },
}

export const Black: Story = {
  args: {
    color: 'black',
    size: 'medium',
    children: 'Badge',
  },
}

export const White: Story = {
  args: {
    color: 'white',
    size: 'medium',
    children: 'Badge',
  },
}

export const Small: Story = {
  args: {
    color: 'accent',
    size: 'small',
    children: 'Small',
  },
}

export const Medium: Story = {
  args: {
    color: 'accent',
    size: 'medium',
    children: 'Medium',
  },
}

export default meta
