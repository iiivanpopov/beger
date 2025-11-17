import type { User } from '@/api'
import { EditIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { I18nText } from '@/components'
import { useI18n } from '@/shared/hooks'
import { Button, Form, Input, Modal, Typography } from '@/shared/ui'
import styles from './EditUserModal.module.css'
import { useEditUserModal } from './hooks/useEditUserModal'

export interface EditUserModalProps {
  user: User
}

export function EditUserModal({ user }: EditUserModalProps) {
  const { state, actions } = useEditUserModal(user)
  const { t } = useI18n()

  return (
    <Modal isOpen={state.editUserModal.isOpen} setIsOpen={state.editUserModal.setIsOpen}>
      <Modal.Trigger asChild>
        <Button
          icon
          aria-label={t('aria-label.edit-user')}
          title={t('aria-label.edit-user')}
          variant="ghost"
          size="small"
        >
          <EditIcon />
        </Button>
      </Modal.Trigger>
      <Modal.Content className={styles.modal}>
        <Typography variant="subheading" tag="h2">
          <I18nText>title.update-user</I18nText>
        </Typography>
        <Form onSubmit={actions.onSubmit}>
          <Controller
            name="userName"
            control={state.editUserForm.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>
                  <I18nText>label.user-name</I18nText>
                </Form.Label>
                <Input
                  {...field}
                  placeholder={t('placeholder.user-name')}
                />
                {fieldState.error?.message && (
                  <Form.Error>
                    <I18nText>{fieldState.error?.message}</I18nText>
                  </Form.Error>
                )}
              </Form.Field>
            )}
          />
          <Controller
            name="fullName"
            control={state.editUserForm.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>
                  <I18nText>label.full-name</I18nText>
                </Form.Label>
                <Input
                  {...field}
                  placeholder={t('placeholder.full-name')}
                />
                {fieldState.error?.message && (
                  <Form.Error>
                    <I18nText>{fieldState.error?.message}</I18nText>
                  </Form.Error>
                )}
              </Form.Field>
            )}
          />
          <Controller
            name="password"
            control={state.editUserForm.control}
            render={({ field, fieldState }) => (
              <Form.Field>
                <Form.Label>
                  <I18nText>label.password</I18nText>
                </Form.Label>
                <Input
                  {...field}
                  placeholder={t('placeholder.password-mask')}
                  type="password"
                />
                {fieldState.error?.message && (
                  <Form.Error>
                    <I18nText>{fieldState.error?.message}</I18nText>
                  </Form.Error>
                )}
              </Form.Field>
            )}
          />
          <Button type="submit">
            <I18nText>action.update</I18nText>
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
