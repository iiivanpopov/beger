import type { LoginData } from './schemas/login.schema'
import type { RegisterData } from './schemas/register.schema'
import { eq } from 'drizzle-orm'
import { db, tokensTable, toUserDTO, usersTable } from '@/database'
import { ApiError } from '@/exceptions'
import { signJWTs } from '@/utils'

export async function register(userPayload: RegisterData) {
  const [userExists] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userName, userPayload.userName))
  if (userExists)
    throw ApiError.BadRequest('User already exists')

  const passwordHash = await Bun.password.hash(userPayload.password)
  const [user] = await db
    .insert(usersTable)
    .values({
      passwordHash,
      fullName: userPayload.fullName,
      userName: userPayload.userName,
      role: 'user',
    })
    .returning()
  if (!user)
    throw new ApiError.InternalServerError()

  const signedTokens = await signJWTs({
    sub: String(user.id),
    role: user.role,
  })
  await db.insert(tokensTable).values({
    token: signedTokens.refreshToken,
    userId: user.id,
  })

  return toUserDTO(user)
}

export async function login(userPayload: LoginData) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.userName, userPayload.userName))
  if (!user)
    throw ApiError.Unauthorized('Invalid email or password')

  const isVerified = await Bun.password.verify(userPayload.password, user.passwordHash)
  if (!isVerified)
    throw ApiError.Unauthorized('Invalid email or password')

  const signedTokens = await signJWTs({
    sub: String(user.id),
    role: user.role,
  })
  await db
    .insert(tokensTable)
    .values({
      token: signedTokens.refreshToken,
      userId: user.id,
    })
    .onConflictDoUpdate({
      set: { token: signedTokens.refreshToken },
      target: tokensTable.userId,
    })

  return { tokens: signedTokens, user: toUserDTO(user) }
}

export async function logout(userId: number) {
  await db.delete(tokensTable).where(eq(tokensTable.userId, userId))
}

export async function refresh(userId: number, requestedToken: string) {
  const [user] = await db
    .select({
      role: usersTable.role,
      token: tokensTable.token,
    })
    .from(tokensTable)
    .innerJoin(usersTable, eq(usersTable.id, tokensTable.userId))
    .where(eq(tokensTable.userId, userId))
  if (!user || user.token !== requestedToken)
    throw ApiError.Unauthorized()

  const signedTokens = await signJWTs({
    sub: String(userId),
    role: user.role,
  })

  await db
    .update(tokensTable)
    .set({ token: signedTokens.refreshToken })
    .where(eq(tokensTable.userId, userId))

  return signedTokens
}
