import { integer, pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const rolesEnum = pgEnum('roles', ['user', 'admin'])

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  fullName: varchar('full_name', { length: 100 }).notNull(),
  userName: varchar('user_name', { length: 30 }).unique().notNull(),
  role: rolesEnum().default('user').notNull(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export type User = typeof usersTable.$inferSelect
export type UserRole = (typeof rolesEnum.enumValues)[number]
export type InsertUser = typeof usersTable.$inferInsert

export function toUserDTO(user: User) {
  return {
    id: user.id,
    fullName: user.fullName,
    userName: user.userName,
    role: user.role,
    createdAt: user.createdAt,
  }
}
