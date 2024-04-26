import { cookies } from "next/headers"
import { AdminNavbar } from "../../_components/navbar"
import { AdminSidebar } from "../../_components/sidebar/sidebar"
import { COOKIE_LANG } from "@/lib/constants"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  const cookiesClient = cookies()
  const language = cookiesClient.get(COOKIE_LANG)?.value ? cookiesClient.get(COOKIE_LANG)?.value : 'english'

  return (
    <div className={`flex h-full ${language === 'english' ? 'pl-[280px]' : 'pr-[280px]'}`}>
      <AdminSidebar language={language} />
      <div className='w-full'>
        <AdminNavbar lang={language} />
        <div className='px-12 py-8'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout