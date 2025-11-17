import type { CreateTestResultData } from '../schemas/createTestResultSchema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { getOptionsQueryOptions, useCreateTestResultMutation, useDeleteTestResultMutation, useGetSelfTestResultsQuery } from '@/api'
import { queryClient } from '@/providers'
import { useDisclosure, useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { CreateTestResultSchema } from '../schemas/createTestResultSchema'

const createTestResultFormDefaultValue = {
  pcbName: '',
  date: new Date(),
  failed: '',
  firstTry: '',
  total: '',
}

export function useTestResultsPage() {
  const testResultsQuery = useGetSelfTestResultsQuery()
  const optionsQuery = useSuspenseQuery(getOptionsQueryOptions)

  const lastTestResultsModal = useDisclosure()
  const createTestResultForm = useForm<CreateTestResultData>({
    defaultValues: createTestResultFormDefaultValue,
    resolver: valibotResolver(CreateTestResultSchema),
  })

  const { t } = useI18n()
  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const deleteTestResultMutation = useDeleteTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.deleted-test-result'))
        queryClient.invalidateQueries({ queryKey: ['getSelfTestResults'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createTestResultMutation = useCreateTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.created-test-result'))
        queryClient.invalidateQueries({ queryKey: ['getSelfTestResults'] })
        createTestResultForm.reset()
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = createTestResultForm.handleSubmit((body) => {
    if (!optionsQuery.data?.data.pcbNames.includes(body.pcbName)) {
      return createTestResultForm.setError('pcbName', {
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
    actions: {
      onSubmit,
      onDelete,
    },
    queries: {
      options: optionsQuery,
      testResults: testResultsQuery,
    },
    state: {
      lastTestResultsModal,
      createTestResultForm,
    },
  }
}
