import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from './Textarea'

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    variant: { control: 'radio', options: ['contained'] },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: 'number' },
  },
}

type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    variant: 'contained',
    placeholder: 'Enter your message...',
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    variant: 'contained',
    placeholder: 'Disabled textarea',
    disabled: true,
    rows: 4,
  },
}

export default meta
