'use client'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

import { auth } from '@/lib/firebase-config'

import type { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
}
export const AuthContext = React.createContext<AuthContextType>({ user: null })
export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        // pathname === '/login' && router.push('/dashboard')
      } else {
        setUser(null)
        router.push('/login')
      }
      setLoading(false)
    })
  }, [router, pathname])

  return (
    <AuthContext.Provider value={{ user }}>{loading ? <div>Loading...</div> : children}</AuthContext.Provider>
  )
}
