import { accessJwtMiddleware } from '@/middleware'
import { createRouter } from '@/utils'
import { fetchOptions } from './options.service'

export const optionsRouter = createRouter()

optionsRouter.get('/', accessJwtMiddleware, async (c) => {
  const options = await fetchOptions()

  return c.json({ data: options, success: true }, 200)
})
