import { getAuth } from 'firebase-admin/auth'
import { NextRequest } from 'next/server'

import { customInitApp } from './firebase-admin-config'

customInitApp()

export async function authenticateToken(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      error: 'Bearer authentication required',
      status: 401,
    }
  }

  const token = authHeader.split(' ')[1]
  try {
    const decodedToken = await getAuth().verifyIdToken(token)
    return { decodedToken, error: null }
  } catch (err) {
    return { decodedToken: null, error: (err as Error).message }
  }
}
