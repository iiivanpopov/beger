import type { InsertRepair } from '@/database/tables'
import { and, desc, eq, gte, sql } from 'drizzle-orm'
import { db, repairsTable } from '@/database'
import { ApiError } from '@/exceptions'
import { buildMeta, pageToOffset } from '@/utils'

export async function getUserRepairs(userId: number) {
  const repairs = await db
    .select()
    .from(repairsTable)
    .where(
      and(
        eq(repairsTable.userId, userId),
        gte(repairsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
    .limit(10)
    .orderBy(desc(repairsTable.createdAt))

  return repairs
}

export async function getRepairs({ page = 1, limit = 10 }) {
  const testResults = await db
    .select()
    .from(repairsTable)
    .limit(limit)
    .offset(pageToOffset({ page, limit }))
    .orderBy(desc(repairsTable.createdAt))

  const count = await db.$count(repairsTable)

  const meta = buildMeta(count, page, limit)

  return {
    testResults,
    meta,
  }
}

export async function createRepair(userId: number, payload: Omit<InsertRepair, 'createdAt' | 'userId'>) {
  const [repair] = await db
    .insert(repairsTable)
    .values({
      userId,
      defect: payload.defect,
      pcbName: payload.pcbName,
      note: payload.note,
      date: payload.date,
    })
    .returning()
  if (!repair)
    throw ApiError.InternalServerError()

  return repair
}

export async function deleteSafeRepair(userId: number, testResultId: number) {
  const [testResult] = await db
    .select()
    .from(repairsTable)
    .where(
      and(
        eq(repairsTable.id, testResultId),
        eq(repairsTable.userId, userId),
        gte(repairsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
  if (!testResult)
    throw ApiError.NotFound()

  await db
    .delete(repairsTable)
    .where(
      and(
        eq(repairsTable.id, testResultId),
        eq(repairsTable.userId, userId),
        gte(repairsTable.createdAt, sql`NOW() - interval '1 day'`),
      ),
    )
}

export async function deleteRepair(repairId: number) {
  return await db.delete(repairsTable).where(eq(repairsTable.id, repairId))
}
