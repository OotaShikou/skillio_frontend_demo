'use client'

import { signInWithRedirect } from 'firebase/auth'

// AuthContextからフックをインポート
import { useAuthContext } from '@/context/AuthContext' // AuthContextからフックをインポート
import { auth, googleProvider } from '@/lib/firebase-config'

export default function SignIn() {
  function signInByGoogle() {
    void signInWithRedirect(auth, googleProvider)
  }
  const { user } = useAuthContext()
  async function fetchUserData() {
    const token = await user?.getIdToken()
    console.log(token)

    try {
      const response = await fetch('/api/checkIsLogin', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const userData = await response.json()
      console.log('User data:', userData)
      return userData
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  fetchUserData()

  return (
    <>
      <button onClick={() => signInByGoogle()}>Sign In</button>
    </>
  )
}
