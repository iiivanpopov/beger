import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tooltip } from './Tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => (
    <Tooltip>
      <Tooltip.Trigger>
        Hover me
      </Tooltip.Trigger>
      <Tooltip.Content>
        This is a tooltip!
      </Tooltip.Content>
    </Tooltip>
  ),
}

export default meta
