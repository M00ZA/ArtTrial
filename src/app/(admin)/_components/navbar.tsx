"use client"

import Link from "next/link"
import Image from "next/image"

import { AdminSearch } from "./search"
import { Bell, Check, Globe, MessageCircleCodeIcon, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAdmin } from "@/hooks/useAdmin"
import { useRouter } from "next/navigation"
import { useLang } from "@/hooks/useLanguage"
import { Input } from "@/components/ui/input"

export const AdminNavbar = ({ lang }: { lang: any }) => {

  const { admin, isLoading: pendingAdmin } = useAdmin()
  const { language, changeLanguage } = useLang()
  const router = useRouter()

  return (
    <nav className={`flex  justify-between p-4 px-12 border-b ${lang === 'english' ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className="w-[350px] relative">
        <Input placeholder='Search....' />
        <Search className={`text-gray-400 absolute top-1/2 transform -translate-y-1/2 ${lang == 'english' ? 'right-3' : 'left-3'}`} />
      </div>

      <div className='flex gap-x-2'>
        <Button variant='ghost'>
          <Link href='/'><Bell /></Link>
        </Button>

        <DropdownMenu>
          
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'><Globe /></Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => {
              changeLanguage('english')
              router.refresh()
            }}>
              <a href='' className='flex gap-2 items-center'>
                {language === 'english' && (
                  <Check className='size-4 text-gray-500' />
                )}
                English
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              changeLanguage('arabic')
              router.refresh()
            }}>
              <a href='' className='flex gap-2 items-center'>
                {language === 'arabic' && (
                  <Check className='size-4 text-gray-500' />
                )}
                Arabic
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
 
            <div className='ml-2'>
              <Avatar>
                <AvatarImage src={admin?.profileImg} alt="@shadcn" />
                <AvatarFallback className='capitalize'>{admin?.name[0] ?? "L"}</AvatarFallback>
              </Avatar>
            </div>
            
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56">
            {pendingAdmin ? (
              <h6>Loading</h6>
            ): (
              <>
                <DropdownMenuLabel><Link href='/admin/profile'>@{admin.userName}</Link></DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={ () => router.push(`/admin/profile`) }>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                 
                  <DropdownMenuItem onClick={ () => router.push(`/admin/settings`) }>
                    Settings
                  </DropdownMenuItem>
                 
                  <DropdownMenuItem onClick={ () => router.push(`/admin/profile/password`) }>
                    Change Password
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem onClick={ () => router.push(`/admin/profile/details`) }>
                    Change Details
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={ () => router.push(`/admin/profile/language`) }>
                    Default Language
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
            
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

    </nav>
  )
}