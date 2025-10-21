import { useSearch } from '@tanstack/react-router'
import { GridIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { useGetUsersQuery } from '@/api'
import { usePagination } from '@/shared/hooks'
import { Button, ConfirmableButton, Modal, Table, Typography } from '@/shared/ui'
import { Pagination } from '@/shared/ui/Pagination/Pagination'
import styles from './UsersSectionHeader.module.css'

export interface UsersSectionHeaderProps {
  onDelete: (id: number) => void
}

export function UsersSectionHeader({ onDelete }: UsersSectionHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const search = useSearch({ from: '/(admin)/users' })

  const usersQuery = useGetUsersQuery({ page: search.page, limit: 5 })

  const pagination = usePagination({ pages: usersQuery.data?.data.meta.pages })

  return (
    <div className={styles.header}>
      <Typography tag="h2" variant="subheading">Users</Typography>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Modal.Trigger>
          <Button icon variant="ghost" size="small"><GridIcon /></Button>
        </Modal.Trigger>
        <Modal.Content className={styles.modal}>
          <Modal.Header className={styles.modalHeader}>
            <Typography variant="subheading" tag="h2">Users</Typography>
          </Modal.Header>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.Cell>ID</Table.Cell>
                <Table.Cell>Full Name</Table.Cell>
                <Table.Cell>User name</Table.Cell>
                <Table.Cell>Created At</Table.Cell>
                <Table.Cell>{null}</Table.Cell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {usersQuery.data?.data.users?.map(user => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>{user.fullName}</Table.Cell>
                  <Table.Cell>{user.userName}</Table.Cell>
                  <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                    <ConfirmableButton
                      icon
                      size="small"
                      variant="ghost"
                      onClick={() => onDelete(user.id)}
                    >
                      <Trash2Icon />
                    </ConfirmableButton>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Pagination pagination={pagination} className={styles.pagination} />
        </Modal.Content>
      </Modal>
    </div>
  )
}
