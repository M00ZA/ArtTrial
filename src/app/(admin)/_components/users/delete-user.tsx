"use client";

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

export const DeleteUserComponent = () => {
  const { id } = useParams();
  const { user, isLoading } = useGetUser(id as string);

  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
  });

  const deleteUserHandler = () => {
    deleteMutation.mutate(id as string);
    toast.message("User deleted!");
    queryClient.invalidateQueries({ queryKey: ["users"] });
    router.push("/admin/users");
  };

  if (isLoading) {
    return <DeleteUserComponent.Loading />;
  }

  if (!user) {
    return <div>user not found!</div>;
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle
          icon={Trash}
          label={
            <span className="flex items-center gap-2">
              Delete User{" "}
              <Link
                className="text-sm text-gray-400 font-normal"
                href={`/admin/users/${user?.id}`}
              >
                /{user?.name} ({user.email})
              </Link>
            </span>
          }
        />
        <DeleteAction
          icon={Trash}
          cancelRoute="/admin/users"
          title={"Are you sure that you want to delete this user?"}
          description="Once you click delete, then confirm you will not be able to reverse this data!"
          confirmAction={deleteUserHandler}
        />
      </div>
    </div>
  );
};

DeleteUserComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete User" />
      <DeleteActionSkeleton />
    </div>
  );
};

DeleteUserComponent.Error404 = () => {};
