import type { InsertTestResult } from '@/database/tables'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import { db, testResultsTable } from '@/database'
import { ApiError } from '@/exceptions'
import { buildMeta, pageToOffset } from '@/utils'

export async function getUserTestResults(userId: number) {
  return await db
    .select()
    .from(testResultsTable)
    .where(
      and(
        eq(testResultsTable.userId, userId),
        gte(testResultsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
    .limit(10)
    .orderBy(desc(testResultsTable.createdAt))
}

export async function getTestResults({ page = 1, limit = 10 }) {
  const testResults = await db
    .select()
    .from(testResultsTable)
    .limit(limit)
    .offset(pageToOffset({ page, limit }))
    .orderBy(desc(testResultsTable.createdAt))

  const count = await db.$count(testResultsTable)

  const meta = buildMeta(count, page, limit)

  return {
    testResults,
    meta,
  }
}

export async function createTestResult(
  userId: number,
  payload: Omit<InsertTestResult, 'createdAt' | 'userId'>,
) {
  const [testResult] = await db
    .insert(testResultsTable)
    .values({
      userId,
      pcbName: payload.pcbName,
      passedFirstTry: payload.passedFirstTry,
      failed: payload.failed,
      total: payload.total,
      date: payload.date,
    })
    .returning()
  if (!testResult)
    throw new ApiError.InternalServerError()

  return testResult
}

export async function deleteSafeTestResult(userId: number, testResultId: number) {
  const [testResult] = await db
    .select()
    .from(testResultsTable)
    .where(
      and(
        eq(testResultsTable.id, testResultId),
        eq(testResultsTable.userId, userId),
        gte(testResultsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
  if (!testResult)
    throw ApiError.NotFound()

  await db
    .delete(testResultsTable)
    .where(
      and(
        eq(testResultsTable.id, testResultId),
        eq(testResultsTable.userId, userId),
        gte(testResultsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
}

export async function deleteTestResult(testResultId: number) {
  return await db.delete(testResultsTable).where(eq(testResultsTable.id, testResultId))
}
