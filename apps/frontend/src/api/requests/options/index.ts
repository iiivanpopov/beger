import type { Options } from 'ky'
import type { GetOptionsResponse } from '@/api/types'
import { $api } from '@/api/instance'

export interface GetOptionsConfig {
  config?: Options
}

export async function getOptions({ config }: GetOptionsConfig = {}) {
  return $api.get<GetOptionsResponse>('options', config).json()
}
