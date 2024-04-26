import { LucideIcon } from "lucide-react"
import { PageTitle } from "./page-title"
import { Skeleton } from "@/components/ui/skeleton"

export const TableSkeleton = ({ pageTitle, icon: Icon, children }: { children?: React.ReactNode, pageTitle?: string, icon?: LucideIcon }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>

        <div className="flex gap-2 items-center">
          <Skeleton className='w-8 h-8' />
          <Skeleton className='w-[150px] h-8' />
        </div>

      </div>

      <div className="mt-4">
        <Skeleton className='w-full h-[500px]' />
        <Skeleton className='w-full h-[70px] mt-2' />
      </div>
    </div>
  )
}