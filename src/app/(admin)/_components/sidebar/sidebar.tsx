"use client";

import { useAdmin } from "@/hooks/useAdmin"
import { useLang } from "@/hooks/useLanguage";

import { RenderSidebar } from "./types/render-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const AdminSidebar = ({ language }: { language: any }) => {

  const { admin, isLoading: pending } = useAdmin()

  return (
    <>
      {pending ? (
        <AdminSidebar.Loading language={language} />
      ): (
        <RenderSidebar language={language} role={admin?.role} />
      )}
    </>
  )
}

AdminSidebar.Loading = ({ language }: { language: any }) => {
  return (
    <div className={`w-[280px] fixed top-0 bg-white border-r border-r-gray-200 h-full ${language === 'english' ? 'left-0 right-auto' : 'border-l border-l-gray-200 right-0 left-auto'}`}>

      <div className="p-4 pb-0">
        <Skeleton className='ml-4 mb-2 h-2 w-[100px]' />
        {Array.from({ length: 1 }).map((item: any, idx) => (
          <Skeleton key={`a${idx}`} className='p-2 h-10 mb-2 mx-4 gap-6 px-4 flex items-center transition-all rounded-md' /> 
        ))}
      </div>

      <div className="p-4 pb-0">
        <Skeleton className='ml-4 mb-2 h-2 w-[100px]' />
        {Array.from({ length: 2 }).map((item: any, idx) => (
          <Skeleton key={`b${idx}`} className='p-2 h-10 mb-2 mx-4 gap-6 px-4 flex items-center transition-all rounded-md' 
          /> 
        ))}
      </div>

      <div className="p-4 pb-0">
        <Skeleton className='ml-4 mb-2 h-2 w-[100px]' />
        {Array.from({ length: 3 }).map((item: any, idx) => (
          <Skeleton key={`c${idx}`} className='p-2 h-10 mb-2 mx-4 gap-6 px-4 flex items-center transition-all rounded-md' 
          /> 
        ))}
      </div>

      <div className="p-4 pb-0">
        <Skeleton className='ml-4 mb-2 h-2 w-[100px]' />
        {Array.from({ length: 3 }).map((item: any, idx) => (
          <Skeleton key={`d${idx}`} className='p-2 h-10 mb-2 mx-4 gap-6 px-4 flex items-center transition-all rounded-md' 
          /> 
        ))}
      </div>

    </div>
  )
}