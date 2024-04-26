import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function createActionObject(url: string, tooltipTitle: string, icon: any, customClass = '') {
  return {
    key: Math.random() * 100000,
    url: url,
    tooltipTitle: tooltipTitle,
    icon: icon,
    customClass: customClass
  }
}

export function createAction(action: any) {
  const { icon: Icon } = action
  return (
    <Link href={action.url}><Button variant="outline" size='icon'><Icon className='size-5' /></Button></Link>
  )
}

export default function GridActionsContainer({ actions }: { actions: any }) {
  return (
    <div className="flex gap-2">
      {actions.map((action: any) => (
        <>
          {createAction(action)}
        </>
      ))}
    </div>
  )
}


