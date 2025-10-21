import type { CreateRepairData } from '@/pages/Repairs/schemas/createRepair.schema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouteContext } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { getOptionsQueryOptions, useCreateRepairMutation, useDeleteRepairMutation, useGetSelfRepairsQuery } from '@/api'
import { CreateRepairSchema } from '@/pages/Repairs/schemas/createRepair.schema'
import { useMutationErrorHandler, useToast } from '@/shared/hooks'

export function useRepairsPage() {
  const [isOpen, setIsOpen] = useState(false)
  const { queryClient } = useRouteContext({ from: '__root__' })

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
        toast.success('Deleted repair record')
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createRepairMutation = useCreateRepairMutation({
    options: {
      onSuccess: () => {
        toast.success('Created repair record')
        queryClient.invalidateQueries({ queryKey: ['repairs', 'self'] })
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

    if (!optionsQuery.data?.data.defects.includes(data.defect)) {
      return form.setError('defect', {
        type: 'manual',
        message: 'Invalid defect',
      })
    }

    createRepairMutation.mutate(data)
  })

  const onDelete = (id: number) => deleteRepairMutation.mutate({ id })

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
