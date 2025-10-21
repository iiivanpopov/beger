export const apiConfig = {
  baseUrl: import.meta.env.VITE_PUBLIC_BASE_URL,
  headers: {
    accessToken: 'Authorization',
    refreshToken: 'X-Refresh-Token',
  },
} as const
