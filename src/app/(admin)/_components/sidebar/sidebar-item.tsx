import { LucideIcon } from "lucide-react"

import Link from "next/link"

interface SidebarItemProps {
  label: string,
  href: string,
  icon: LucideIcon
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  return (
    <Link href={href} className='p-2 gap-6 px-4 flex items-center transition-all rounded-md hover:bg-gray-100'>
      <Icon className='text-primary' />
      <span className='text-black font-semibold'>{label}</span>
    </Link>
  )
}