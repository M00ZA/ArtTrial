"use client"

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";
import { useAdmin } from "@/hooks/useAdmin";
import { getAdmins } from "../../_actions/admins";

import { Admin } from "@/types";
import { AdminsColumns } from "../../_tables/admins";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";
import { Button } from "@/components/ui/button"
import { PageTitle } from "../page-title"
import { Plus, Trash, Lock } from "lucide-react"

import translate from "@/translations/translate";

export const AdminsComponent = () => {

  const adminsQuery = useQuery({
    queryKey: ['admins'],
    queryFn: () => getAdmins()
  })
  const { admin, isLoading: pendingAdmin } = useAdmin()

  const admins: Admin[] = adminsQuery.data?.data?.data?.admins?.filter((a: Admin) => a.id != admin.id)

  if (adminsQuery.isLoading || pendingAdmin) {
    return (
      <TableSkeleton />
    )
  }

  return (
    <div>
      <PageTitle label={translate('admins')} icon={Lock}>
        <Button className='flex gap-2'><Link href='/admin/admins/add' className='flex gap-2'><Plus className='size-5' /> {translate('new')}</Link></Button>
      </PageTitle>

      <DataTable 
        rows={admins}
        columns={AdminsColumns}
      />
    </div>
  )
}