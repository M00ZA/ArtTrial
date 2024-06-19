"use client";

// Nextjs
import Link from "next/link";

// Components & Icons
import { Trash } from "lucide-react";
import { PageTitle } from "../page-title";
import { DeleteAction, DeleteActionSkeleton } from "../delete-confirmation";

// Helpers & Functions & Actions
import { toast } from "sonner";
import { deleteEvent } from "../../_actions/events";

// Hooks
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEvent } from "@/hooks/useEvent";

export const DeleteEventComponent = () => {
  const { id } = useParams();
  const { event, isLoading } = useEvent(id as string);

  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: () => {
      toast.success("Event deleted!");
      queryClient.invalidateQueries({ queryKey: ["events", id] });
      router.push("/admin/events");
    },
  });

  const deleteEventHandler = () => {
    deleteMutation.mutate(id as string);
    // toast.message("Event deleted!");
    // router.push("/admin/events");
  };

  if (isLoading) {
    return <DeleteEventComponent.Loading />;
  }

  if (!event) {
    return <div>Event Not Found!</div>;
  }

  return (
    <div>
      <div className="w-[50%]">
        <PageTitle
          icon={Trash}
          label={<span className="flex items-center gap-2">Delete Event</span>}
        />
        <DeleteAction
          icon={Trash}
          cancelRoute="/admin/events"
          title={"Are you sure that you want to delete this Event?"}
          description="Once you click delete, then confirm you will not be able to reverse this data!"
          confirmAction={deleteEventHandler}
        />
      </div>
    </div>
  );
};

DeleteEventComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Trash} label="Delete Product" />
      <DeleteActionSkeleton />
    </div>
  );
};

DeleteEventComponent.Error404 = () => {};
