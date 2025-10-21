import { vValidator } from '@hono/valibot-validator'
import { accessJwtMiddleware, roleMiddleware } from '@/middleware'
import { createRouter, getUserId, getUserRole, IdParam, PaginationQuery } from '@/utils'
import { CreateTestResultBody } from './schemas/create-test-result.schema'
import {
  createTestResult,
  deleteSafeTestResult,
  deleteTestResult,
  getTestResults,
  getUserTestResults,
} from './test-result.service'

export const testResultsRouter = createRouter()

testResultsRouter.use(accessJwtMiddleware)

testResultsRouter.get('/me', async (c) => {
  const userId = getUserId(c)

  const testResults = await getUserTestResults(userId)

  return c.json({ data: testResults, success: true }, 200)
})

testResultsRouter.get(
  '/',
  vValidator('query', PaginationQuery),
  roleMiddleware('admin'),
  async (c) => {
    const queryParams = c.req.valid('query')

    const testResults = await getTestResults(queryParams)

    return c.json({ data: testResults, success: true }, 200)
  },
)

testResultsRouter.post('/', vValidator('json', CreateTestResultBody), async (c) => {
  const body = c.req.valid('json')
  const userId = getUserId(c)

  const testResult = await createTestResult(userId, body)

  return c.json({ data: testResult, success: true }, 201)
})

testResultsRouter.delete('/:id', vValidator('param', IdParam), async (c) => {
  const userRole = getUserRole(c)
  const userId = getUserId(c)
  const testResultId = c.req.valid('param').id

  if (userRole === 'user')
    await deleteSafeTestResult(userId, testResultId)
  else if (userRole === 'admin')
    await deleteTestResult(testResultId)

  return c.json({ success: true }, 200)
})
