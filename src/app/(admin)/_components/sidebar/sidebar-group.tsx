import { BookDashed } from "lucide-react"
import { SidebarItem } from "./sidebar-item"

interface SidebarGroupProps {
  label: string,
  items: any
}

export const SidebarGroup = ({ label, items }: SidebarGroupProps) => {
  return (
    <div className="p-4 pb-0">
      <h5 className='ml-4 text-gray-400 mb-2'>{label}</h5>
      {items.map((item: any) => (
        <SidebarItem href={item.href} label={item.label} icon={item.icon} />
      ))}
    </div>
  )
}