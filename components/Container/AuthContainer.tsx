'use client'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import React, { useEffect } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { Icons } from '@/components/ui/icons'

import fetchWithAuth from '@/lib/clientApi'
import { auth } from '@/lib/firebase-config'
import { authState } from '@/recoil/atoms/authState'

import HeaderNav from '../HeaderNav/HeaderNav'

const AuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const setUser = useSetRecoilState(authState)
  const currentUser = useRecoilValue(authState)
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = React.useState<boolean>(true)
  const cookies = parseCookies()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userData = cookies.userData ? JSON.parse(cookies.userData) : null
        userData && setUser({ displayName: userData?.name, email: userData?.email, photoUrl: userData?.icon })

        if (!currentUser && !userData) {
          await fetchWithAuth('/api/user', 'GET', {
            accessToken: await user.getIdToken(),
          }).then((res) => {
            const fetchedUserData = res.user[0]
            setCookie(null, 'userData', JSON.stringify(fetchedUserData), {
              maxAge: 3600 * 24 * 7,
              path: '/',
            })
            setUser({ displayName: userData?.name, email: userData?.email, photoUrl: userData?.icon })
          })
        }
        if (['/', '/login', '/register'].includes(pathname)) router.push('/dashboard')
      } else {
        setUser(null)
        destroyCookie(null, 'userData')
        if (pathname !== '/login') router.push('/login')
      }
      setLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, pathname])

  return (
    <div>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center">
          <Icons.spinner className="mr-2 h-8 w-8 animate-spin" color="purple" />
        </div>
      ) : (
        <>
          {currentUser && <HeaderNav />}
          {children}
        </>
      )}
    </div>
  )
}

export default AuthContainer
