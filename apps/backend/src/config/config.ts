export const config = {
  jwt: {
    accessExpiresIn: 15 * 60,
    refreshExpiresIn: 7 * 24 * 60 * 60,
  },

  headers: {
    accessToken: 'Authorization',
    refreshToken: 'X-Refresh-Token',
  },

  cache: {
    options: {
      key: 'options',
      ttl: 60 * 5,
    },
  },

  validation: {
    MIN_USERNAME_LEN: 3,
    MIN_PASSWORD_LEN: 6,
    MIN_FULLNAME_LEN: 8,
    MIN_PCB_NAME_LEN: 1,
    MIN_DEFECT_LEN: 1,
  },
}
