import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { usersTable } from './users.sql'

export const testResultsTable = pgTable('test_result', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  pcbName: varchar('pcb_name', { length: 255 }).notNull(),
  passedFirstTry: integer('passed_first_try').notNull(),
  failed: integer().notNull(),
  total: integer().notNull(),
  date: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export type TestResult = typeof testResultsTable.$inferSelect
export type InsertTestResult = typeof testResultsTable.$inferInsert
