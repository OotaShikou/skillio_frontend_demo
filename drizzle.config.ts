import { loadEnvConfig } from '@next/env'

import type { Config } from 'drizzle-kit'

loadEnvConfig(process.cwd())

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
