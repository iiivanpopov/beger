import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'
import { getOptionsQueryOptions, useCreateTestResultMutation, useDeleteTestResultMutation, useGetSelfTestResultsQuery } from '@/api'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'
import { pcbNameValidator } from '@/shared/utils'

const CreateTestResultSchema = v.object({
  pcbName: pcbNameValidator,
  date: v.date(),
  firstTry: v.pipe(v.string(), v.nonEmpty('* Required')),
  failed: v.pipe(v.string(), v.nonEmpty('* Required')),
  total: v.pipe(v.string(), v.nonEmpty('* Required')),
})

type CreateTestResultData = v.InferOutput<typeof CreateTestResultSchema>

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

  const optionsQuery = useSuspenseQuery(getOptionsQueryOptions)
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

  const onSubmit = form.handleSubmit((body) => {
    if (!optionsQuery.data?.data.pcbNames.includes(body.pcbName)) {
      return form.setError('pcbName', {
        type: 'manual',
        message: 'Invalid board name',
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
