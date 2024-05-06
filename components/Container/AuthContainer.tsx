'use client'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

import { Icons } from '@/components/ui/icons'

import { auth } from '@/lib/firebase-config'
import { authState } from '@/recoil/atoms/authState'

const AuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useSetRecoilState(authState)
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = React.useState<boolean>(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser({ displayName: user?.displayName, email: user?.email, photoUrl: user?.photoURL })
      if (user) {
        if (pathname === '/' || pathname === '/login' || pathname === '/register') router.push('/dashboard')
      } else {
        router.push('/login')
      }
      setLoading(false)
    })
  }, [setUser, router, pathname])

  return (
    <div>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <Icons.spinner className="mr-2 h-8 w-8 animate-spin" color="purple" />
        </div>
      ) : (
        children
      )}
    </div>
  )
}

export default AuthContainer
