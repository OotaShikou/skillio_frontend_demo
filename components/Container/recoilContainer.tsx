'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'

import AuthContainer from './AuthContainer'

const recoilContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <AuthContainer>{children}</AuthContainer>
    </RecoilRoot>
  )
}

export default recoilContainer
