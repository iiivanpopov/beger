import type { Options } from 'ky'
import type { GetOptionsResponse } from '@/api/types'
import { $api } from '@/api/instance'

export async function getOptions(config?: Options) {
  return $api.get<GetOptionsResponse>('options', {
    ...config,
  }).json()
}
