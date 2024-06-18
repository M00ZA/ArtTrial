"use client";

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteCategory } from "../../_actions/categories";

// Hooks
import { useGetCategory } from "@/hooks/useGetCategory";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteCategoryComponent = () => {
  const { id } = useParams();
  const { category, isLoading } = useGetCategory(id as string);

  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toast.success("Category deleted!");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      router.push("/admin/categories");
    },
  });

  const deleteCategoryHandler = () => {
    deleteMutation.mutate(id as string);
  };

  if (isLoading) {
    return <DeleteCategoryComponent.Loading />;
  }

  if (!category) {
    return <div>Category Not Found</div>;
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle
          icon={Trash}
          label={
            <span className="flex items-center gap-2">
              Delete Category{" "}
              <Link
                className="text-sm text-gray-400 font-normal"
                href={`/admin/categories/${category?.id}`}
              >
                /{category?.title} ({category.slug})
              </Link>
            </span>
          }
        />
        <DeleteAction
          icon={Trash}
          cancelRoute="/admin/categories"
          title={"Are you sure that you want to delete this category?"}
          description="Once you click delete, then confirm you will not be able to reverse this data!"
          confirmAction={deleteCategoryHandler}
        />
      </div>
    </div>
  );
};

DeleteCategoryComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Category" />
      <DeleteActionSkeleton />
    </div>
  );
};

DeleteCategoryComponent.Error404 = () => {};
