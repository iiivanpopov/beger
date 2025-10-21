import { integer, pgTable, text } from 'drizzle-orm/pg-core'
import { usersTable } from './users.sql'

export const tokensTable = pgTable('tokens', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .unique()
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  token: text('token').notNull(),
})

export type Token = typeof tokensTable.$inferSelect
export type InsertToken = typeof tokensTable.$inferInsert
