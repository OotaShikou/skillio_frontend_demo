'use client'

import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { TrashIcon, Pencil1Icon, Cross2Icon } from '@radix-ui/react-icons'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Workbook } from '@/db/schema'
import { cn } from '@/lib/utils'

import WorkbookDialog from './WorkbookDialog'

const WorkbookCardDropdownMenu = ({ className, workbook }: { className?: string; workbook: Workbook }) => {
  const [open, setOpen] = useState(false)
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('h-10 w-10', className)}>
          <DotsVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuShortcut className="flex items-center justify-end ">
          <Cross2Icon className="m-1 h-4 w-4 hover:text-red-500" onClick={() => setOpen(false)} />
        </DropdownMenuShortcut>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <WorkbookDialog
            type="edit"
            workbookId={workbook.id}
            customButton={
              <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                編集
                <DropdownMenuShortcut>
                  <Pencil1Icon className="h-4 w-4 rounded-sm " />
                </DropdownMenuShortcut>
              </div>
            }
            defaultParams={{ title: workbook.title }}
          />
          <DropdownMenuItem>共同編集者を招待</DropdownMenuItem>
          <DropdownMenuItem>生徒を招待</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <WorkbookDialog
          type="delete"
          workbookId={workbook.id}
          customButton={
            <div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              削除
              <DropdownMenuShortcut>
                <TrashIcon className="h-4 w-4" />
              </DropdownMenuShortcut>
            </div>
          }
          defaultParams={{ title: workbook.title }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default WorkbookCardDropdownMenu
