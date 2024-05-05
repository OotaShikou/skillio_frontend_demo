import { auth } from '@/lib/firebase-config'

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>
  body?: any // リクエストボディ用のプロパティ
  accessToken?: string
}

async function fetchWithAuth(url: string, method: string, options: FetchOptions = {}) {
  const accessToken = options?.accessToken ?? (await auth.currentUser?.getIdToken())
  const headers = new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
    ...options.headers,
  })

  const fetchOptions: RequestInit = {
    method: method,
    headers: headers,
    credentials: 'include',
    body: JSON.stringify(options.body),
  }

  const response = await fetch(url, fetchOptions)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

export default fetchWithAuth
