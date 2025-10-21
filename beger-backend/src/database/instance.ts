import type { BunSQLDatabase } from 'drizzle-orm/bun-sql'
import { drizzle } from 'drizzle-orm/bun-sql'
import { migrate } from 'drizzle-orm/bun-sql/migrator'
import { config } from '@/config'
import * as relations from './relations'
import * as tables from './tables'
import { usersTable } from './tables'

const schema = { ...tables, ...relations }

export const db = drizzle(config.database.url, { schema })
export type Database = BunSQLDatabase<typeof schema>

if (process.env.NODE_ENV === 'production') {
  await migrate(db, { migrationsFolder: 'drizzle' })

  await db
    .insert(usersTable)
    .values({
      fullName: 'Admin',
      userName: 'admin',
      passwordHash: await Bun.password.hash(import.meta.env.ADMIN_PASSWORD!),
      role: 'admin',
    })
    .onConflictDoNothing()
    .then(() => console.log('Admin seeded successfully.'))
    .catch(error => console.error(error))
}
