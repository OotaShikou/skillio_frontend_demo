'use client'

import React from 'react'
import useSWR from 'swr'

import WorkbookCard from '@/components/Workbook/WorkbookCard'

import { Workbook } from '@/db/schema'
import fetchWithAuth from '@/lib/clientApi'
import { cn } from '@/lib/utils'

const WorkbookCardList = ({ className }: { className?: string }) => {
  const { data } = useSWR('/api/workbook', (url) => fetchWithAuth(url, 'GET'))
  return (
    <>
      <div className={cn('flex gap-2 whitespace-nowrap', className)}>
        {data?.userWith?.workbooks?.map((workbook: Workbook) => (
          <WorkbookCard key={workbook.id} {...workbook} />
        ))}
      </div>
    </>
  )
}

export default WorkbookCardList
