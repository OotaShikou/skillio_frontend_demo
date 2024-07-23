'use client'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import WorkbookCardList from '@/components/Workbook/WorkbookCardList'
import WorkbookDialog from '@/components/Workbook/WorkbookDialog'

export default function Dashboard() {
  return (
    <>
      <ScrollArea className="mx-2 w-full pb-3 pr-5 pt-2">
        <WorkbookCardList />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="mr-2 mt-1 flex justify-end">
        <WorkbookDialog type="create" />
      </div>
    </>
  )
}
