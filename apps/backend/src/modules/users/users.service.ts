import type { InsertUser } from '@/database/tables'
import { and, desc, eq } from 'drizzle-orm'
import { db, toUserDTO, usersTable } from '@/database'
import { ApiError } from '@/exceptions'
import { buildMeta, pageToOffset } from '@/utils'

export async function getUser(userId: number) {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId))
  if (!user)
    throw ApiError.NotFound()

  return toUserDTO(user)
}

export async function getUsers({ page = 1, limit = 10 }) {
  const users = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.role, 'user'))
    .limit(limit)
    .offset(pageToOffset({ page, limit }))
    .orderBy(desc(usersTable.createdAt))

  const count = await db.$count(usersTable, eq(usersTable.role, 'user'))

  const meta = buildMeta(count, page, limit)

  return {
    users: users.map(toUserDTO),
    meta,
  }
}

export async function updateUser(
  userId: number,
  payload: Partial<Pick<InsertUser, 'userName' | 'passwordHash' | 'fullName' | 'role'> & {
    password: string
  }> = {},
) {
  const [userExists] = await db.select().from(usersTable).where(eq(usersTable.id, userId))
  if (!userExists)
    throw ApiError.NotFound()

  const data: Record<string, string | undefined> = {
    userName: payload.userName,
    fullName: payload.fullName,
    role: payload.role,
    passwordHash: undefined,
  }

  if (payload.password)
    data.passwordHash = await Bun.password.hash(payload.password)

  const [user] = await db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, userId))
    .returning()
  if (!user)
    throw ApiError.InternalServerError()

  return toUserDTO(user)
}

export async function deleteUser(userId: number) {
  const [userExists] = await db.select().from(usersTable).where(eq(usersTable.id, userId))
  if (!userExists)
    throw ApiError.NotFound()

  await db
    .delete(usersTable)
    .where(and(eq(usersTable.id, userId), eq(usersTable.role, 'user')))
}
