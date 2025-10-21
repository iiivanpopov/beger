import { vValidator } from '@hono/valibot-validator'
import { accessJwtMiddleware, roleMiddleware } from '@/middleware'
import { createRouter, getUserId, IdParam, PaginationQuery } from '@/utils'
import { UpdateUserBody } from './schemas/update-user.schema'
import { deleteUser, getUser, getUsers, updateUser } from './users.service'

export const usersRouter = createRouter()

usersRouter.use(accessJwtMiddleware)

usersRouter.get('/me', async (c) => {
  const userId = getUserId(c)

  const user = await getUser(userId)

  return c.json({ data: user, success: true }, 200)
})

usersRouter.get('/', vValidator('query', PaginationQuery), roleMiddleware('admin'), async (c) => {
  const queryParams = c.req.valid('query')

  const users = await getUsers(queryParams)

  return c.json({ data: users, success: true }, 200)
})

usersRouter.patch(
  '/:id',
  vValidator('param', IdParam),
  vValidator('json', UpdateUserBody),
  roleMiddleware('admin'),
  async (c) => {
    const body = c.req.valid('json')
    const targetId = c.req.valid('param').id

    const user = await updateUser(targetId, body)

    return c.json({ data: user, success: true }, 200)
  },
)

usersRouter.delete('/:id', vValidator('param', IdParam), roleMiddleware('admin'), async (c) => {
  const targetId = c.req.valid('param').id

  await deleteUser(targetId)

  return c.json({ success: true }, 200)
})
