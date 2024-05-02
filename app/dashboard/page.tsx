'use client'

import { signInWithRedirect } from 'firebase/auth'

import { useAuthContext } from '@/context/AuthContext'
import { auth, googleProvider } from '@/lib/firebase-config'

export default function SignIn() {
  function signInByGoogle() {
    void signInWithRedirect(auth, googleProvider)
  }
  const { user } = useAuthContext()
  async function fetchUserData() {
    const token = await user?.getIdToken()

    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const userData = await response.json()
      console.log(userData)

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
