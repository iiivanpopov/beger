import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Autocomplete } from './Autocomplete'

const meta: Meta<typeof Autocomplete> = {
  title: 'UI/Autocomplete',
  component: Autocomplete,
}

type Story = StoryObj<typeof Autocomplete>

export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('')

    return (
      <Autocomplete value={value} onChange={setValue}>
        <Autocomplete.Trigger placeholder="Select option" />
        <Autocomplete.Items>
          <Autocomplete.Item value="Option 1">Option 1</Autocomplete.Item>
          <Autocomplete.Item value="Option 2">Option 2</Autocomplete.Item>
          <Autocomplete.Item value="Option 3">Option 3</Autocomplete.Item>
        </Autocomplete.Items>
      </Autocomplete>
    )
  },
}

export default meta
