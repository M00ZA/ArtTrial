"use client"

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteAdmin } from "../../_actions/admins";


// Hooks
import { useGetAdmin } from "@/hooks/useAdmin";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteAdminComponent = () => {

  const { id } = useParams()
  const { admin, isLoading } = useGetAdmin(id as string)

  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdmin(id),
  })

  const deleteAdminHandler = () => {
    deleteMutation.mutate(id as string)
    toast.message("Admin deleted!")
    queryClient.invalidateQueries({ queryKey: ['admins'] })
    router.push('/admin/admins')
  }

  if (isLoading) {
    return (
      <DeleteAdminComponent.Loading />
    )
  }

  if (!admin) {
    return (
      <div>
        admin not found!
      </div>
    )
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle icon={Trash} label={<span className='flex items-center gap-2'>Delete Admin <Link className='text-sm text-gray-400 font-normal' href={`/admin/admins/${admin?.id}`}>/{admin?.name} ({admin.role})</Link></span>} />
        <DeleteAction 
          icon={Trash}
          cancelRoute="/admin/admins"
          title={'Are you sure that you want to delete this admin?'}
          description='Once you click delete, then confirm you will not be able to reverse this data!'
          confirmAction={deleteAdminHandler}
        />
      </div>
    </div>
  );
}

DeleteAdminComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Admin" />
      <DeleteActionSkeleton />
    </div>
  )
}

DeleteAdminComponent.Error404 = () => {
  
}