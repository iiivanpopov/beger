import { relations } from 'drizzle-orm'
import { repairsTable, testResultsTable, tokensTable, usersTable } from '@/database/tables'

export const tokensRelations = relations(tokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tokensTable.userId],
    references: [usersTable.id],
  }),
}))

export const repairsRelations = relations(repairsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [repairsTable.userId],
    references: [usersTable.id],
  }),
}))

export const testResultsRelations = relations(testResultsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [testResultsTable.userId],
    references: [usersTable.id],
  }),
}))

export const usersRelations = relations(usersTable, ({ one, many }) => ({
  token: one(tokensTable, {
    fields: [usersTable.id],
    references: [tokensTable.userId],
  }),
  repairs: many(repairsTable),
  testResults: many(testResultsTable),
}))
