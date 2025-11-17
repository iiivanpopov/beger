import type { CreateRepairData } from '../schemas/CreateRepairSchema'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { getOptionsQueryOptions, useCreateRepairMutation, useDeleteRepairMutation, useGetSelfRepairsQuery } from '@/api'
import { queryClient } from '@/providers'
import { useDisclosure, useI18n, useMutationErrorHandler, useToast } from '@/shared/hooks'
import { CreateRepairSchema } from '../schemas/CreateRepairSchema'

const createRepairFormDefaultValues = {
  pcbName: '',
  date: new Date(),
  defect: '',
  note: '',
}

export function useRepairsPage() {
  const repairsQuery = useGetSelfRepairsQuery()
  const optionsQuery = useSuspenseQuery(getOptionsQueryOptions)

  const lastRepairsModal = useDisclosure()
  const createRepairForm = useForm<CreateRepairData>({
    defaultValues: createRepairFormDefaultValues,
    resolver: valibotResolver(CreateRepairSchema),
  })

  const { t } = useI18n()
  const toast = useToast()
  const mutationErrorHandler = useMutationErrorHandler()

  const deleteRepairMutation = useDeleteRepairMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.deleted-repair'))
        queryClient.invalidateQueries({ queryKey: ['getSelfRepairs'] })
      },
      onError: mutationErrorHandler,
    },
  })

  const createRepairMutation = useCreateRepairMutation({
    options: {
      onSuccess: () => {
        toast.success(t('message.created-repair'))
        queryClient.invalidateQueries({ queryKey: ['getSelfRepairs'] })
        createRepairForm.reset()
      },
      onError: mutationErrorHandler,
    },
  })

  const onSubmit = createRepairForm.handleSubmit((body) => {
    if (!optionsQuery.data?.data.pcbNames.includes(body.pcbName)) {
      return createRepairForm.setError('pcbName', {
        type: 'manual',
        message: t('error.invalid-board-name'),
      })
    }

    if (!optionsQuery.data?.data.defects.includes(body.defect)) {
      return createRepairForm.setError('defect', {
        type: 'manual',
        message: t('error.invalid-defect'),
      })
    }

    createRepairMutation.mutate({ payload: { body } })
  })

  const onDelete = (id: number) => deleteRepairMutation.mutate({ payload: { params: { id } } })

  return {
    state: {
      lastRepairsModal,
      createRepairForm,
    },
    actions: {
      onDelete,
      onSubmit,
    },
    queries: {
      options: optionsQuery,
      repairs: repairsQuery,
    },
  }
}
