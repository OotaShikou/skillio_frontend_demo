import { NextRequest, NextResponse } from 'next/server'

import { authenticateToken } from '@/lib/authenticateToken'

export async function GET(req: NextRequest) {
  const result = await authenticateToken(req)

  if ('error' in result && result.error) {
    return NextResponse.json({ error: `Invalid: ${result.error}` })
  }

  // 認証が成功した場合の処理
  const user = result
  return NextResponse.json({ user })
}
