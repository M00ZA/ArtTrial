import { Button } from "@/components/ui/button"
import {formatMoney} from "@/lib/utils"
import { ChevronDown, MoreVertical } from "lucide-react"

export const ChartsComponent = () => {
  return (
    <div className="flex gap-6">
      <div className="w-[485px] shadow-md rounded-md ring-1 ring-gray-200 p-4 h-fit">
        <div className='flex items-center justify-between'>
          <h4 className='font-bold'>Total Renvenue</h4>
          <Button variant='ghost' size='icon' className='size-8'><MoreVertical className='size-4' /></Button>
        </div>
        <div className='text-center py-14'>
          <p className='text-red-600'>TODO: CHART CIRCLE</p>
        </div>
        <div className='text-center'>
          <p className='text-gray-400'>Total Sales made this week</p>
          <span className='text-green-700 font-bold text-xl'>{formatMoney(5000)}</span>
        </div>
      </div>

      <div className='w-full shadow-md rounded-md ring-1 ring-gray-200 p-4 h-fit'>
        <div className='flex items-center justify-between'>
          <h4 className='font-bold'>The Sales</h4>
          <Button variant='ghost' className='text-black'>Month <ChevronDown className='size-4 ml-1' /></Button>
        </div>
        <div className='text-center py-14'>
          <p className='text-red-600'>TODO: BAR CIRCLE</p>
        </div>
      </div>
    </div>
  )
}