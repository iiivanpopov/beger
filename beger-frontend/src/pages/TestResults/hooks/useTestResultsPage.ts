import type { CreateTestResultData } from '@/pages/TestResults/schemas/createTestResult.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useCreateTestResultMutation, useDeleteTestResultMutation, useGetOptionsQuery, useGetSelfTestResultsQuery } from '@/api'
import { CreateTestResultSchema } from '@/pages/TestResults/schemas/createTestResult.schema'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'

export function useTestResultsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { queryClient } = useRouteContext({ from: '__root__' })

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

  const optionsQuery = useGetOptionsQuery({
    options: {
      staleTime: 5 * 60 * 1000,
    },
  })
  const testResultsQuery = useGetSelfTestResultsQuery()

  const mutationErrorHandler = useMutationErrorHandler()
  const toast = useToast()

  const deleteTestResultMutation = useDeleteTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success('Deleted test results record')
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createTestResultMutation = useCreateTestResultMutation({
    options: {
      onSuccess: () => {
        toast.success('Created test results record')
        queryClient.invalidateQueries({ queryKey: ['test-results', 'self'] })
        form.reset()
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = form.handleSubmit((data) => {
    if (!optionsQuery.data?.data.pcbNames.includes(data.pcbName)) {
      return form.setError('pcbName', {
        type: 'manual',
        message: 'Invalid board name',
      })
    }

    createTestResultMutation.mutate({
      date: data.date,
      pcbName: data.pcbName,
      passedFirstTry: Number(data.firstTry),
      failed: Number(data.failed),
      total: Number(data.total),
    })
  })

  const onDelete = (id: number) => deleteTestResultMutation.mutate({ id })

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
