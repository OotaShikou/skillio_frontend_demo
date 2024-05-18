'use client'

import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import React, { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import HeaderNav from '@/components/HeaderNav/HeaderNav'
import { Sidebar } from '@/components/Sidebar/Sidebar'
import { Icons } from '@/components/ui/icons'

import { User } from '@/db/schema'
import fetchWithAuth from '@/lib/clientApi'
import { auth } from '@/lib/firebase-config'
import { authState } from '@/recoil/atoms/authState'

const AuthContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter()
  const pathname = usePathname()
  const cookies = parseCookies()
  const isNotCheckAuthPage = ['/', '/login', '/register'].includes(pathname)

  const setRecoilUser = useSetRecoilState(authState)
  const currentUser = useRecoilValue(authState)
  const [loading, setLoading] = useState<boolean>(currentUser ? true : false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let userData: User = cookies.userData ? JSON.parse(cookies.userData) : null
        userData && setRecoilUser(userData)
        if (!currentUser && !userData) {
          await fetchWithAuth('/api/user', 'GET', {
            accessToken: await user.getIdToken(),
          }).then((res) => {
            const userData: User = res.user[0]
            setCookie(null, 'userData', JSON.stringify(userData), {
              maxAge: 3600 * 24 * 7,
              path: '/',
            })
            setRecoilUser(userData)
          })
        }
        if (isNotCheckAuthPage) router.push('/dashboard')
      } else {
        setRecoilUser(null)
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
        <div>
          {!isNotCheckAuthPage && <HeaderNav />}
          <div className={isNotCheckAuthPage ? '' : 'grid border-t lg:grid-cols-5'}>
            {!isNotCheckAuthPage && <Sidebar />}
            <div className="col-span-3 lg:col-span-4 lg:border-l">{children}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuthContainer
