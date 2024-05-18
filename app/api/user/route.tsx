import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db/db'
import { users } from '@/db/schema'
import { authenticateToken } from '@/lib/authenticateToken'

export async function GET(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })
  if (!result.decodedToken?.uid) return NextResponse.json({ error: 'Invalid UID' })

  const user = await db.select().from(users).where(eq(users.uid, result.decodedToken?.uid))
  return NextResponse.json({ user })
}

export async function POST(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const body = await req.json()
  if (!body.uid) return NextResponse.json({ message: 'UIDが必要です' })

  try {
    const existingUser = await db.select().from(users).where(eq(users.uid, body.uid))
    if (existingUser.length > 0) return NextResponse.json({ message: 'このUIDは既に登録されています' })

    const newUser = await db.insert(users).values({
      uid: body.uid,
      email: body.email,
      name: body.name || body.email.split('@')[0],
      icon: body.photoURL || '',
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'データベースエラー' })
  }
}
