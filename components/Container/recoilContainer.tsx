'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

import AuthContainer from './AuthContainer'

const recoilContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <RecoilRoot>
        <AuthContainer>{children}</AuthContainer>
      </RecoilRoot>
    </SWRConfig>
  )
}

export default recoilContainer
