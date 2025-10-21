import type { Meta, StoryObj } from '@storybook/react-vite'
import { Typography } from './Typography'

const meta = {
  component: Typography,
  title: 'UI/Typography',
  argTypes: {
    variant: { control: 'radio', options: ['heading', 'subheading', 'body', 'caption'] },
  },
} satisfies Meta<typeof Typography>

type Story = StoryObj<typeof meta>

export const Heading: Story = {
  args: {
    tag: 'h1',
    variant: 'heading',
    children: 'Heading',
  },
}

export const Subheading: Story = {
  args: {
    tag: 'h2',
    variant: 'subheading',
    children: 'Subheading',
  },
}

export const Body: Story = {
  args: {
    tag: 'div',
    variant: 'body',
    children: 'Body',
  },
}

export const Caption: Story = {
  args: {
    tag: 'div',
    variant: 'caption',
    children: 'Caption',
  },
}

export default meta
