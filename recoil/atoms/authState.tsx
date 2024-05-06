import { atom } from 'recoil'

import type { User } from '@/types/user'

export const authState = atom<User | null>({
  key: 'authState', // このキーはグローバルにユニークである必要があります
  default: null, // 初期状態は未認証（null）
})
