import React from 'react'

import { Card, CardContent, CardDescription } from '@/components/ui/card'

import { Workbook } from '@/db/schema'

import WorkbookCardDropdownMenu from './WorkbookCardDropdownMenu'
const WorkbookCard = (workbook: Workbook) => {
  return (
    <Card className="relative flex h-48 w-60 flex-col justify-end">
      <WorkbookCardDropdownMenu className="absolute right-0.5 top-0.5 z-10" workbook={workbook} />
      <CardContent className="px-3 pb-2">
        <CardDescription className="font-bold">{workbook.title}</CardDescription>
        <CardDescription>問題数: {workbook.questions?.length}</CardDescription>
        <CardDescription>作成者: {workbook.user?.name}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default WorkbookCard
