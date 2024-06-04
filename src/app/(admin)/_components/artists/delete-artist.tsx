"use client";

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";
import { PageTitle } from "../page-title";

// Helpers & Functions & Actions
import { deleteArtist } from "../../_actions/artists";

// Hooks
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useGetArtist } from "@/hooks/useGetArtist";

export const DeleteArtistComponent = () => {
  const { id } = useParams();
  const { artist, isLoading } = useGetArtist(id as string);

  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteArtist(id),
    onSuccess: (d) => {
      toast.success("Artist deleted!");
      queryClient.invalidateQueries({ queryKey: ["artists"] });
      router.push("/admin/artists");
    },
  });

  const deleteArtistHandler = () => {
    deleteMutation.mutate(id as string);
  };

  if (isLoading) {
    return <DeleteArtistComponent.Loading />;
  }

  if (!artist) {
    return <div>Artist not found!</div>;
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle
          icon={Trash}
          label={
            <span className="flex items-center gap-2">
              Delete Artist{" "}
              <Link
                className="text-sm text-gray-400 font-normal"
                href={`/admin/artists/${artist?.id}`}
              >
                /{artist?.name} ({artist.email})
              </Link>
            </span>
          }
        />
        <DeleteAction
          icon={Trash}
          cancelRoute="/admin/artists"
          title={"Are you sure that you want to delete this artist?"}
          description="Once you click delete, then confirm you will not be able to reverse this data!"
          confirmAction={deleteArtistHandler}
        />
      </div>
    </div>
  );
};

DeleteArtistComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Artist" />
      <DeleteActionSkeleton />
    </div>
  );
};

DeleteArtistComponent.Error404 = () => {};
