'use client'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { useSWRConfig } from 'swr'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'

import fetchWithAuth from '@/lib/clientApi'
import { authState } from '@/recoil/atoms/authState'
import { WorkbookDialogParams } from '@/types/types'

import WorkbookForm from './WorkbookForm'

type WorkbookDialogProps = {
  type: 'create' | 'edit' | 'delete'
  workbookId?: string
  className?: string
  customButton?: React.ReactNode
  defaultParams?: WorkbookDialogParams
}

const WorkbookDialog = ({
  type,
  workbookId,
  className,
  customButton,
  defaultParams,
}: WorkbookDialogProps) => {
  const currentUser = useRecoilValue(authState)
  const { mutate } = useSWRConfig()
  const [params, setParams] = useState<WorkbookDialogParams>(defaultParams || { title: '' })
  const [validatedError, setValidatedError] = useState<{ path: string; message: string }[]>([])
  const [open, setOpen] = useState(false)

  const workbookValidator = (params: WorkbookDialogParams) => {
    return z
      .object({
        title: z
          .string()
          .min(1, { message: 'タイトルは必須です' })
          .max(20, 'タイトルは20文字未満でなければなりません。'),
      })
      .parse(params)
  }

  const createWorkbook = async () => {
    try {
      const validatedParams = workbookValidator(params)
      await fetchWithAuth('/api/workbook', 'POST', {
        body: { ...validatedParams, userId: currentUser?.id },
      })
      setValidatedError([])
      setParams({ title: '' })
      mutate('/api/workbook')
      setOpen(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }))
        setValidatedError(errorMessages)
      }
    }
  }

  const updateWorkbook = async () => {
    try {
      if (type === 'edit' && !workbookId) throw new Error('workbookId is required')
      const validatedParams = workbookValidator(params)
      await fetchWithAuth('/api/workbook', 'PUT', {
        body: { ...validatedParams, userId: currentUser?.id, workbookId },
      })
      setValidatedError([])
      setParams({ title: '' })
      mutate('/api/workbook')
      setOpen(false)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }))
        setValidatedError(errorMessages)
      } else {
        console.error('Unexpected error type:', error)
      }
    }
  }

  const deleteWorkbook = async () => {
    if (type === 'delete' && !workbookId) throw new Error('workbookId is required')
    await fetchWithAuth('/api/workbook', 'DELETE', {
      body: { userId: currentUser?.id, workbookId },
    })
    mutate('/api/workbook')
    setOpen(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {customButton ? (
            customButton
          ) : (
            <Button className={className} variant="create">
              <PlusCircledIcon className="mr-2 h-5 w-5" /> {type === 'create' && '問題集を作成'}
              {type === 'edit' && '問題集を編集'}
              {type === 'delete' && '問題集を削除'}
            </Button>
          )}
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription className="text-md font-bold">
              {type === 'create' && '問題集を作成'}
              {type === 'edit' && '問題集を編集'}
              {type === 'delete' && '問題集を削除'}
            </DialogDescription>
            {type === 'delete' && (
              <DialogDescription>
                問題集に関連するデータが削除され、それらを復元することはできません。本当に問題集を削除しますか？
              </DialogDescription>
            )}
          </DialogHeader>
          {(type === 'create' || type === 'edit') && (
            <WorkbookForm params={params} setParams={setParams} error={validatedError} />
          )}
          <DialogFooter>
            <Button
              variant={type === 'create' || type === 'edit' ? 'create' : 'destructive'}
              onClick={() => {
                if (type === 'create') createWorkbook()
                if (type === 'edit') updateWorkbook()
                if (type === 'delete') deleteWorkbook()
              }}
            >
              {type === 'create' && '作成する'}
              {type === 'edit' && '更新する'}
              {type === 'delete' && '削除する'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default WorkbookDialog
