import { getAuth } from 'firebase-admin/auth'
import { NextResponse, NextRequest } from 'next/server'

import { customInitApp } from '@/lib/firebase-admin-config'

// Init the Firebase SDK every time the server is called
customInitApp()
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({
      error: 'Bearer authentication required',
    })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = await getAuth().verifyIdToken(token)
    return NextResponse.json(decodedToken)
  } catch (err) {
    NextResponse.json({
      error: 'Invalid authentication credentials',
      details: (err as Error).message,
    })
  }
  return NextResponse.next()
}
