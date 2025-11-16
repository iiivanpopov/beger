import type { CreateTestResultData } from '../schemas/createTestResultSchema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getOptionsQueryOptions, useCreateTestResultMutation, useDeleteTestResultMutation, useGetSelfTestResultsQuery } from '@/api'
import { queryClient } from '@/providers'
import { useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { CreateTestResultSchema } from '../schemas/createTestResultSchema'

export function useTestResultsPage() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateTestResultData>({
    defaultValues: {
      pcbName: '',
      date: new Date(),
      failed: '',
      firstTry: '',
      total: '',
    },
    resolver: valibotResolver(CreateTestResultSchema),
  })

  const optionsQuery = useSuspenseQuery(getOptionsQueryOptions)
  const testResultsQuery = useGetSelfTestResultsQuery()

  const mutationErrorHandler = useMutationErrorHandler()
  const toast = useToast()

  const deleteTestResultMutation = useDeleteTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.deleted-test-result'))
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createTestResultMutation = useCreateTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.created-test-result'))
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
        form.reset()
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = form.handleSubmit((body) => {
    if (!optionsQuery.data?.data.pcbNames.includes(body.pcbName)) {
      return form.setError('pcbName', {
        type: 'manual',
        message: t('error.invalid-board-name'),
      })
    }

    createTestResultMutation.mutate({
      payload: {
        body: {
          date: body.date,
          pcbName: body.pcbName,
          firstTry: Number(body.firstTry),
          failed: Number(body.failed),
          total: Number(body.total),
        },
      },
    })
  })

  const onDelete = (id: number) => deleteTestResultMutation.mutate({ payload: { params: { id } } })

  return {
    form,
    actions: {
      onSubmit,
      onDelete,
    },
    data: {
      options: optionsQuery,
      testResults: testResultsQuery,
    },
    ui: {
      modal: {
        isOpen,
        setIsOpen,
      },
    },
  }
}
