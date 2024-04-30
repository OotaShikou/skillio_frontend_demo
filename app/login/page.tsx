'use client'

import { signInWithRedirect } from 'firebase/auth'

import { auth, googleProvider } from '@/lib/firebase-config'

export default function SignIn() {
  function signInByGoogle() {
    void signInWithRedirect(auth, googleProvider)
  }

  return (
    <>
      <button onClick={() => signInByGoogle()}>Sign In</button>
    </>
  )
}
