"use client";

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteSubject } from "../../_actions/subjects";

// Hooks
import { useGetSubject } from "@/hooks/useGetSubject";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const DeleteSubjectComponent = () => {
  const { id } = useParams();
  const { subject, isLoading } = useGetSubject(id as string);

  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteSubject(id),
    onSuccess: () => {
      toast.success("Subject deleted!");
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
      router.push("/admin/subjects");
    },
  });

  const deleteSubjectHandler = () => {
    deleteMutation.mutate(id as string);
  };

  if (isLoading) {
    return <DeleteSubjectComponent.Loading />;
  }

  if (!subject) {
    return <div>Subject Not Found</div>;
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle
          icon={Trash}
          label={
            <span className="flex items-center gap-2">
              Delete Subject{" "}
              <Link
                className="text-sm text-gray-400 font-normal"
                href={`/admin/subjects/${subject?.id}`}
              >
                /{subject?.title} ({subject.slug})
              </Link>
            </span>
          }
        />
        <DeleteAction
          icon={Trash}
          cancelRoute="/admin/categories"
          title={"Are you sure that you want to delete this subject?"}
          description="Once you click delete, then confirm you will not be able to reverse this data!"
          confirmAction={deleteSubjectHandler}
        />
      </div>
    </div>
  );
};

DeleteSubjectComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Subject" />
      <DeleteActionSkeleton />
    </div>
  );
};

DeleteSubjectComponent.Error404 = () => {};
