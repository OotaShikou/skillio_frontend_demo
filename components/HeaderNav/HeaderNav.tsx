import React from 'react'
import { useRecoilValue } from 'recoil'

import { authState } from '@/recoil/atoms/authState'

import { MainNav } from './MainNav'
import { Search } from './Search'
import TeamSwitcher from './TeamSwitcher'
import { UserNav } from './UserNav'

const HeaderNav = () => {
  const user = useRecoilValue(authState)

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
