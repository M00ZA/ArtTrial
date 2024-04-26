"use client"

import { LucideIcon } from "lucide-react"

interface PageTitleProps {
  label: React.ReactNode,
  icon?: LucideIcon,
  children?: React.ReactNode
}

export const PageTitle = ({ label, icon: Icon, children }: PageTitleProps) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className='flex items-center gap-4 font-bold'>{Icon && <Icon />} {label}</h3>
      <div className='flex gap-1'>
        {children}
      </div>
    </div>
  )
}