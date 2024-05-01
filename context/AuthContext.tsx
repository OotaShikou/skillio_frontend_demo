'use client'

import { onAuthStateChanged } from 'firebase/auth'
import React from 'react'

import { auth } from '@/lib/firebase-config'

import type { User } from 'firebase/auth'

interface AuthContextType {
  user: User | null
}
export const AuthContext = React.createContext<AuthContextType>({ user: null })

export const useAuthContext = () => React.useContext(AuthContext)

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user change')
        setUser(user)
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )
}
