import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

import * as schema from './schema'

dotenv.config({ path: '../.env.local' })

export const DatabaseError = pg.DatabaseError

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
})

export const db = drizzle(pool, { logger: true, schema })
