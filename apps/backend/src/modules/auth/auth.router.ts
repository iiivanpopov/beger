import { vValidator } from '@hono/valibot-validator'
import { accessJwtMiddleware, refreshJwtMiddleware, roleMiddleware } from '@/middleware'
import { createRouter, getRefreshToken, getUserId } from '@/utils'
import { login, logout, refresh, register } from './auth.service'
import { LoginBody } from './schemas/login.schema'
import { RegisterBody } from './schemas/register.schema'

export const authRouter = createRouter()

authRouter.post('/login', vValidator('json', LoginBody), async (c) => {
  const body = c.req.valid('json')

  const data = await login(body)

  return c.json({ data, success: true }, 200)
})

authRouter.post(
  '/register',
  vValidator('json', RegisterBody),
  accessJwtMiddleware,
  roleMiddleware('admin'),
  async (c) => {
    const body = c.req.valid('json')

    const user = await register(body)

    return c.json({ data: user, success: true }, 201)
  },
)

authRouter.post('/logout', refreshJwtMiddleware, async (c) => {
  const userId = getUserId(c)

  await logout(userId)

  return c.json({ success: true }, 200)
})

authRouter.post('/refresh', refreshJwtMiddleware, async (c) => {
  const refreshToken = getRefreshToken(c)!
  const userId = getUserId(c)

  const tokens = await refresh(userId, refreshToken)

  return c.json({ data: tokens, success: true }, 200)
})
