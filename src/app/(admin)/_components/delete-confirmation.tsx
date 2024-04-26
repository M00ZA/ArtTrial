import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { LucideIcon } from "lucide-react"

import Link from "next/link"

interface DeleteActionProps {
  icon: LucideIcon,
  title: string,
  description: string,
  cancelRoute: string,
  deleteLabel?: string,
  confirmTitle?: string,
  confirmDescription?: string,
  confirmAction?: () => void,
}

export const DeleteAction = ({ 
  icon: Icon, 
  title, 
  description, 
  cancelRoute,
  deleteLabel = 'Delete', 
  confirmTitle =  'Are you absolutely sure?',
  confirmDescription = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  confirmAction,
}: DeleteActionProps) => {
  return (
    <Alert className='mt-2'>
      <Icon className="size-6" />
      <AlertTitle className='ml-4'>{title}</AlertTitle>
      <AlertDescription className='ml-4'>
        <p className='text-gray-500 my-2'>{description}</p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="">
              <Button size='sm' className='h-9 w-[80px]' variant='destructive' >{deleteLabel}</Button>
              <Link href={cancelRoute}><Button size='sm' className='h-9 w-[80px] ml-1' variant='outline'>Cancel</Button></Link>
              <div className='clear-both'></div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>
                {confirmDescription}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmAction}>Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </AlertDescription>
    </Alert>
  )
}

export const DeleteActionSkeleton = ({ width = '50%' }: { width?: string }) => {
  return (
    <div className={`w-[${width}] flex gap-4 border p-4 mt-2 border-gray-200 rounded-sm`}>
      <div className='size-8'>
        <Skeleton className='w-full h-full' />
      </div>
      <div>
        <div className='w-full flex flex-col gap-2'>
          <Skeleton className='w-[400px] h-2' />
          <Skeleton className='w-[600px] h-2' />
          <Skeleton className='w-[300px] h-2' />
        </div>
        <div className='w-full flex gap-1 mt-4'>
          <Skeleton className='w-[80px] h-9' />
          <Skeleton className='w-[80px] h-9' />
        </div>
      </div>
      
    </div>
  )
}