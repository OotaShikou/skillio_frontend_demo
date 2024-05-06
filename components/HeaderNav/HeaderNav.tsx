import { Search } from 'lucide-react'
import React from 'react'

import { useAuthContext } from '@/context/AuthContext'

import { MainNav } from './MainNav'
import TeamSwitcher from './TeamSwitcher'
import { UserNav } from './UserNav'

const HeaderNav = () => {
  const { user } = useAuthContext()

  return (
    <div className="flex h-16 items-center px-4">
      <TeamSwitcher />
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav user={user} />
      </div>
    </div>
  )
}

export default HeaderNav
