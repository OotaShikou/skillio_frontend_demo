'use client'
import { signInWithRedirect, createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { auth, googleProvider, githubProvider } from '@/lib/firebase-config'
import { cn } from '@/lib/utils'

interface RegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const RegisterForm = ({ className, ...props }: RegisterFormProps) => {
  const [isLoading] = React.useState<boolean>(false)
  const [username, setUsername] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const signInByGoogle = () => {
    signInWithRedirect(auth, googleProvider)
  }
  const signInByGithub = () => {
    signInWithRedirect(auth, githubProvider)
  }
  const signUpByEmail = () => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <div className={cn('grid gap-3', className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="text"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
          <Button type="submit" disabled={isLoading} onClick={() => signUpByEmail()}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            SignUp with Email
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

export default RegisterForm
