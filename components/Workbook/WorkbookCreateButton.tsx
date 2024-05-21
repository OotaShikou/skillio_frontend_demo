import { PlusCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useRecoilValue } from 'recoil'

import { Button } from '@/components/ui/button'

import fetchWithAuth from '@/lib/clientApi'
import { authState } from '@/recoil/atoms/authState'

const WorkbookCreateButton = ({ className }: { className?: string }) => {
  const currentUser = useRecoilValue(authState)

  const createWorkbook = async () => {
    await fetchWithAuth('/api/workbook', 'POST', {
      body: { title: '新しいワークブック', userId: currentUser?.id },
    })
  }
  return (
    <Button className={className} variant="create" onClick={createWorkbook}>
      <PlusCircledIcon className="mr-2 h-5 w-5" /> 問題集を作成
    </Button>
  )
}

export default WorkbookCreateButton
