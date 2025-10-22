import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { usersTable } from './users.sql'

export const repairsTable = pgTable('repairs', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer('user_id')
    .references(() => usersTable.id, { onDelete: 'set null' }),
  pcbName: varchar('pcb_name', { length: 255 }).notNull(),
  defect: varchar({ length: 255 }).notNull(),
  note: text(),
  date: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

export type Repair = typeof repairsTable.$inferSelect
export type InsertRepair = typeof repairsTable.$inferInsert
