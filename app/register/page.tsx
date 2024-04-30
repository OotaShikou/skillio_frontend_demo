'use client'

import { getRedirectResult } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { auth } from '@/lib/firebase-config'

export default function SignUp() {
  const router = useRouter()
  useEffect(() => {
    getRedirectResult(auth).then(async (userCred) => {
      if (!userCred) {
        return
      }

      fetch('/api/login', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await userCred.user.getIdToken()}`,
        },
      }).then((response) => {
        if (response.status === 200) {
          router.push('/protected')
        }
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function signUp() {
    // void signInWithRedirect(auth, googleProvider)
  }

  return (
    <>
      <button onClick={() => signUp()}>Sign Up</button>
    </>
  )
}
