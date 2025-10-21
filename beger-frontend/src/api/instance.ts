import type { RefreshResponse } from './types'
import ky from 'ky'
import { apiConfig, storageKeys } from '@/shared/config'

export const $api = ky.create({
  prefixUrl: apiConfig.baseUrl,
  hooks: {
    beforeRequest: [
      (request) => {
        const access = localStorage.getItem(storageKeys.accessToken)
        const refresh = localStorage.getItem(storageKeys.refreshToken)

        if (access)
          request.headers.set(apiConfig.headers.accessToken, `Bearer ${access}`)

        if (refresh)
          request.headers.set(apiConfig.headers.refreshToken, `Bearer ${refresh}`)

        return request
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401 && !new Headers(options.headers).has('X-Is-Retry')) {
          const refreshToken = localStorage.getItem(storageKeys.refreshToken)
          if (!refreshToken)
            return response

          try {
            const refreshResponse = await ky.post(`${apiConfig.baseUrl}/auth/refresh`, {
              headers: {
                [apiConfig.headers.refreshToken]: `Bearer ${refreshToken}`,
              },
            }).json<RefreshResponse>()

            localStorage.setItem(storageKeys.accessToken, refreshResponse.data.accessToken)
            localStorage.setItem(storageKeys.refreshToken, refreshResponse.data.refreshToken)

            return ky(request.url, {
              ...options,
              prefixUrl: '', // fix double baseUrl
              headers: {
                ...Object.fromEntries(request.headers),
                [apiConfig.headers.accessToken]: `Bearer ${refreshResponse.data.accessToken}`,
                'X-Is-Retry': 'true',
              },
            })
          }
          catch {
            localStorage.removeItem(storageKeys.accessToken)
            localStorage.removeItem(storageKeys.refreshToken)
            return response
          }
        }

        return response
      },
    ],
  },
})
