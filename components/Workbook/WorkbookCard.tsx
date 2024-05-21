import React from 'react'

import { Card, CardContent, CardDescription } from '@/components/ui/card'

import { Workbook } from '@/db/schema'
const WorkbookCard = (workbook: Workbook) => {
  return (
    <Card className="flex h-48 w-60 flex-col justify-end" key={workbook.id}>
      <CardContent className="h-32 px-3 pb-2">
        <CardDescription className="font-bold">{workbook.title}</CardDescription>
        <CardDescription>問題数: {workbook.questions?.length}</CardDescription>
        <CardDescription>作成者: {workbook.user?.name}</CardDescription>
      </CardContent>
    </Card>
  )
}

export default WorkbookCard
