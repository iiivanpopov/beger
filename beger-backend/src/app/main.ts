import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { config } from '@/config'
import { errorMiddleware } from '@/middleware'
import { createRouter } from '@/utils'
import { router } from './router'

export async function setup() {
  const app = createRouter()

  app.onError(errorMiddleware)

  app.use(cors({ origin: '*' }))
  app.use(logger())

  app.get('/health', c => c.text('ok'))

  app.route('/api', router)

  const server = Bun.serve({
    port: config.server.port,
    development: config.isDevelopment,
    fetch: app.fetch,
  })

  console.log(`Listening ${server.url}`)
}
