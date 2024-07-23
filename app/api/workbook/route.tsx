import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'

import { db } from '@/db/db'
import { users, workbooks } from '@/db/schema'
import { authenticateToken } from '@/lib/authenticateToken'

export async function GET(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })
  if (!result.decodedToken?.uid) return NextResponse.json({ error: 'Invalid UID' })

  const userWith = await db.query.users.findFirst({
    where: eq(users.uid, result.decodedToken?.uid),
    columns: { id: true },
    with: {
      workbooks: {
        with: {
          students: {
            with: {
              user: {
                columns: {
                  id: true,
                },
              },
            },
          },
          questions: {
            columns: {
              id: true,
            },
          },
          user: {
            columns: {
              name: true,
            },
          },
        },
      },
    },
  })

  return NextResponse.json({ userWith })
}

export async function POST(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const body = await req.json()

  const newWorkbook = await db
    .insert(workbooks)
    .values({
      userId: body.userId,
      title: body.title,
    })
    .returning()
  return NextResponse.json({ workbook: newWorkbook })
}

export async function PUT(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const body = await req.json()
  if (!body.workbookId) return NextResponse.json({ error: 'Workbook ID is required' })

  const updatedWorkbook = await db
    .update(workbooks)
    .set({
      title: body.title,
    })
    .where(eq(workbooks.id, body.workbookId))
    .returning()

  if (updatedWorkbook.length === 0) return NextResponse.json({ error: 'Workbook not found' })
  return NextResponse.json({ workbook: updatedWorkbook[0] })
}

export async function DELETE(req: NextRequest) {
  const result = await authenticateToken(req)
  if ('error' in result && result.error) return NextResponse.json({ error: `Invalid: ${result.error}` })

  const body = await req.json()

  const deletedWorkbook = await db.delete(workbooks).where(eq(workbooks.id, body.workbookId)).returning()
  return NextResponse.json({ workbook: deletedWorkbook })
}
