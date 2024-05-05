'use client'
import { signInWithRedirect, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import fetchWithAuth from '@/lib/clientApi'
import { auth, googleProvider, githubProvider } from '@/lib/firebase-config'
import { cn } from '@/lib/utils'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const LoginForm = ({ className, ...props }: LoginFormProps) => {
  const [isLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const signInByGoogle = () => {
    signInWithRedirect(auth, googleProvider)
  }
  const signInByGithub = () => {
    signInWithRedirect(auth, githubProvider)
  }
  const signInByEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
  }
  const updateUser = async (
    uid?: string,
    email?: string | null,
    name?: string | null,
    photoURL?: string | null,
    accessToken?: string,
  ) => {
    await fetchWithAuth('/api/user', 'POST', {
      body: { email, uid, name, photoURL },
      accessToken,
    })
  }

  React.useEffect(() => {
    getRedirectResult(auth)
      .then(async (result) => {
        const email = result?.user.email
        const uid = result?.user.uid
        const name = result?.user.displayName
        const accessToken = await result?.user.getIdToken()
        const photoURL = result?.user.photoURL
        console.log(result)

        if (result !== null) {
          updateUser(uid, email, name, photoURL, accessToken)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              id="password"
              name="password"
              placeholder="password"
              type="password"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" disabled={isLoading} onClick={() => signInByEmail()}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Login with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-50 px-2 text-muted-foreground lg:bg-background">Or continue with</span>
        </div>
      </div>
      <div className="grid gap-1">
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => signInByGoogle()}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button variant="outline" type="button" disabled={isLoading} onClick={() => signInByGithub()}>
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.github className="mr-2 h-4 w-4" />
          )}
          Github
        </Button>
      </div>
    </div>
  )
}

export default LoginForm
