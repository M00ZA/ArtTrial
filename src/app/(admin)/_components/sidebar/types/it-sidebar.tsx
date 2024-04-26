import { AppLogo } from "@/components/logo"
import { SidebarGroup } from "../sidebar-group"
import { Bell, Check, Cog, Headset, Home, List, Lock, LogOut, PaintBucket, ShoppingBag, User, Users, Watch } from "lucide-react"

export const ItSidebar = ({ language }: { language: any }) => {
  
  return (
    <aside className={`w-[280px] fixed top-0 bg-white border-r border-r-gray-200 h-full ${language === 'english' ? 'left-0' : 'border-l border-l-gray-200 right-0'}`}>
      <div className='flex items-center justify-center border-b'>
        <AppLogo />
      </div>

      <SidebarGroup 
        label="Main"
        items={[
          { href: '/admin/dashboard', label: 'Dashboard', icon: Home },
        ]}
      />

      <SidebarGroup 
        label="Lists"
        items={[
          { href: '/admin/users', label: 'Users', icon: Users },
          { href: '/admin/artists', label: 'Artists', icon: PaintBucket },
          { href: '/admin/products', label: 'Products', icon: ShoppingBag },
          { href: '/admin/events', label: 'Events', icon: Check },
        ]}
      />

      <SidebarGroup 
        label="Services"
        items={[
          { href: '/admin/compliants', label: 'Compliants', icon: Headset },
          { href: '/admin/settings', label: 'Settings', icon: Cog },
        ]}
      />

      <SidebarGroup 
        label="User"
        items={[
          { href: '/admin/profile', label: 'Profile', icon: User },
          { href: '/admin/logout', label: 'Logout', icon: LogOut },
        ]}
      />
    </aside>
  )
}

 