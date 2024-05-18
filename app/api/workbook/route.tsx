import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db/db'
import { users } from '@/db/schema'
import { authenticateToken } from '@/lib/authenticateToken'

export async function GET(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })
  if (!result.decodedToken?.uid) return NextResponse.json({ error: 'Invalid UID' })

  const workbooks = await db.query.users.findMany({
    where: eq(users.uid, result.decodedToken?.uid),
    with: {
      workbooks: true,
    },
  })
  // const workbooks = await db.select().from(workbook).where(eq(workbook.userId, result.decodedToken?.uid));
  console.log(workbooks[0].workbooks)
  return NextResponse.json({ workbooks })
}
