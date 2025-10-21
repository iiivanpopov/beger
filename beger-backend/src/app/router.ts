import {
  authRouter,
  optionsRouter,
  repairsRouter,
  testResultsRouter,
  usersRouter,
} from '@/modules'
import { createRouter } from '@/utils'

export const router = createRouter()

router.route('/auth', authRouter)
router.route('/users', usersRouter)
router.route('/repairs', repairsRouter)
router.route('/test-results', testResultsRouter)
router.route('/options', optionsRouter)
