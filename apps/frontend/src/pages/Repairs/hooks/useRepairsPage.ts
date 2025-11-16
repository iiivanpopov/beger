import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as v from 'valibot'
import { getOptionsQueryOptions, useCreateRepairMutation, useDeleteRepairMutation, useGetSelfRepairsQuery } from '@/api'
import { useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { pcbNameValidator } from '@/shared/utils'

const CreateRepairSchema = v.object({
  pcbName: pcbNameValidator,
  defect: v.pipe(v.string(), v.nonEmpty('error.required')),
  note: v.optional(v.string()),
  date: v.date(),
})

type CreateRepairData = v.InferOutput<typeof CreateRepairSchema>

export function useRepairsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { queryClient } = useRouteContext({ from: '__root__' })
  const { t } = useI18n()

  const form = useForm<CreateRepairData>({
    defaultValues: {
      pcbName: '',
      date: new Date(),
      defect: '',
      note: '',
    },
    resolver: valibotResolver(CreateRepairSchema),
  })

  const optionsQuery = useSuspenseQuery(getOptionsQueryOptions)
  const repairsQuery = useGetSelfRepairsQuery()

  const mutationErrorHandler = useMutationErrorHandler()
  const toast = useToast()

  const deleteRepairMutation = useDeleteRepairMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.deleted-repair'))
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createRepairMutation = useCreateRepairMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.created-repair'))
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
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

    if (!optionsQuery.data?.data.defects.includes(body.defect)) {
      return form.setError('defect', {
        type: 'manual',
        message: t('error.invalid-defect'),
      })
    }

    createRepairMutation.mutate({ payload: { body } })
  })

  const onDelete = (id: number) => deleteRepairMutation.mutate({ payload: { params: { id } } })

  return {
    form,
    ui: {
      modal: {
        isOpen,
        setIsOpen,
      },
    },
    actions: {
      onDelete,
      onSubmit,
    },
    data: {
      options: optionsQuery,
      repairs: repairsQuery,
    },
  }
}
