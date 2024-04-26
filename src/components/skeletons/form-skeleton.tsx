import { FormLabel } from "../ui/form"
import { Skeleton } from "../ui/skeleton"

import { useId } from "react"

export const FormSkeleton = ({ numberOfInputs, width }: { numberOfInputs: number, width?: string }) => {
  const id = useId()
  return (
    <div className={`w-[${width ? width : '100%'}]`}>
      {Array.from({ length: numberOfInputs }).map(item => (
        <div key={id} className='mb-6'>
          <Skeleton className='w-[150px] h-6 mb-2' />
          <Skeleton className='w-full h-10 mb-2' />
        </div>
      ))}

      <Skeleton className='w-[120px] h-12' />
    </div>
  )
}