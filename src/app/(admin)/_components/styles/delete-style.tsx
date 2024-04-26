"use client"

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteStyle } from "../../_actions/styles";


// Hooks
import { useGetStyle } from "@/hooks/useGetStyle";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteStyleComponent = () => {

  const { id } = useParams()
  const { style, isLoading } = useGetStyle(id as string)

  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteStyle(id),
    onSuccess: () => {
      toast.success("Style deleted!")
      queryClient.invalidateQueries({ queryKey: ['styles'] })
      router.push('/admin/styles')
    }
  })

  const deleteStyleHandler = () => {
    deleteMutation.mutate(id as string)
  }

  if (isLoading) {
    return (
      <DeleteStyleComponent.Loading />
    )
  }

  if (!style) {
    return (
      <div>
        style Not Found
      </div>
    )
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle icon={Trash} label={<span className='flex items-center gap-2'>Delete Style <Link className='text-sm text-gray-400 font-normal' href={`/admin/styles/${style?._id}`}>/{style?.title} ({style.slug})</Link></span>} />
        <DeleteAction 
          icon={Trash}
          cancelRoute="/admin/styles"
          title={'Are you sure that you want to delete this style?'}
          description='Once you click delete, then confirm you will not be able to reverse this data!'
          confirmAction={deleteStyleHandler}
        />
      </div>
    </div>
  );
}

DeleteStyleComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Style" />
      <DeleteActionSkeleton />
    </div>
  )
}

DeleteStyleComponent.Error404 = () => {
  
}

