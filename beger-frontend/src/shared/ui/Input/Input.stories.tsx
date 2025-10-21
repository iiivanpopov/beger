import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    invalid: { control: 'boolean' },
  },
}

type Story = StoryObj<typeof meta>

export const Contained: Story = {
  args: {
    placeholder: 'Enter text...',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    value: 'Hello World',
    disabled: false,
  },
}

export const Invalid: Story = {
  args: {
    placeholder: 'Invalid input',
    invalid: true,
  },
}

export default meta
