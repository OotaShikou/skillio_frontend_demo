import { atom } from 'recoil'

import { User } from '@/db/schema'

export const authState = atom<User | null>({
  key: 'authState', // このキーはグローバルにユニークである必要があります
  default: null, // 初期状態は未認証（null）
})
