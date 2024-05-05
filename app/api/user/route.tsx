import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db/db'
import { users } from '@/db/schema'
import { authenticateToken } from '@/lib/authenticateToken'

export async function GET(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const user = result
  return NextResponse.json({ user })
}

export async function POST(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const body = await req.json()

  if (!body.uid) {
    const message = 'UIDが必要です'
    console.log(message)
    return NextResponse.json({ message })
  }

  try {
    const existingUser = await db.select().from(users).where(eq(users.uid, body.uid))

    if (existingUser.length > 0) {
      const message = 'このUIDは既に登録されています'
      console.log(message)
      return NextResponse.json({ message })
    }

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
