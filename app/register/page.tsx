import Link from 'next/link'
import React from 'react'

import RegisterForm from '@/components/Auth/RegisterForm'
import { buttonVariants } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const getMeigen = async () => {
  const res = await fetch('https://meigen.doodlenote.net/api/json.php?c=1&e=1', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}

const page = async () => {
  const meigen = await getMeigen()

  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="/login"
          className={cn(buttonVariants({ variant: 'ghost' }), 'absolute right-4 top-4 md:right-8 md:top-8')}
        >
          Login
        </Link>
        <div className="absolute -z-30 flex h-full w-screen flex-col bg-muted px-8 pb-2 pt-5 text-white dark:border-r md:p-10 lg:relative lg:w-auto">
          <div className="absolute inset-0 bg-zinc-900 bg-[url(https://unsplash.it/700/500/)] bg-cover" />

          <div className="relative z-20 mt-auto pt-20">
            <blockquote className="rounded-md bg-black/50 px-3 py-2 sm:space-y-2">
              <p className="text-xs sm:text-base lg:text-lg">&ldquo;{meigen[0].meigen}&rdquo;</p>
              <footer className="flex justify-end text-xs font-extrabold sm:text-base">
                {meigen[0].auther}
              </footer>
            </blockquote>
          </div>
        </div>
        <div className="rounded-md bg-slate-50 p-4 lg:rounded-none lg:bg-transparent lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <RegisterForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default page
