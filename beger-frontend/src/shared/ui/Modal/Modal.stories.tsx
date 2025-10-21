import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '@/shared/ui'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
}

type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Trigger>Open Modal</Modal.Trigger>
        <Modal.Content>
          <div style={{ padding: 20 }}>
            <h2>Modal Title</h2>
            <p>This is a basic modal content.</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal.Content>
      </Modal>
    )
  },
}

export const CustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Trigger>
          <Button>
            Open Custom Modal
          </Button>
        </Modal.Trigger>
        <Modal.Content>
          <div style={{ padding: 30, background: '#f0f0f0', borderRadius: 8 }}>
            <h3>Custom Modal</h3>
            <p>You can place any custom JSX here.</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </div>
        </Modal.Content>
      </Modal>
    )
  },
}

export default meta
