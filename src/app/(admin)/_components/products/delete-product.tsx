"use client"

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteUser } from "../../_actions/users";

// Hooks
import { useGetUser } from "@/hooks/useGetUser";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useProduct } from "@/hooks/useProduct";

export const DeleteProductComponent = () => {

  const { id } = useParams()
  const { product, isLoading } = useProduct(id as string)

  const queryClient = useQueryClient()
  const router = useRouter()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
  })

  const deleteProductHandler = () => {
    deleteMutation.mutate(id as string)
    toast.message("Product deleted!")
    queryClient.invalidateQueries({ queryKey: ['products'] })
    router.push('/admin/products')
  }

  if (isLoading) {
    return (
      <DeleteProductComponent.Loading />
    )
  }

  if (!product) {
    return (
      <div>
        product not found!
      </div>
    )
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle icon={Trash} label={<span className='flex items-center gap-2'>Delete Product</span>} />
        <DeleteAction 
          icon={Trash}
          cancelRoute="/admin/products"
          title={'Are you sure that you want to delete this product?'}
          description='Once you click delete, then confirm you will not be able to reverse this data!'
          confirmAction={deleteProductHandler}
        />
      </div>
    </div>
  );
}

DeleteProductComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Product" />
      <DeleteActionSkeleton />
    </div>
  )
}

DeleteProductComponent.Error404 = () => {
  
}
 