"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { getMeProducts, getProducts } from "@/app/(admin)/_actions/products";
import {
  getEvent,
  getMeEvent,
  updateEvent,
  updateMeEvent,
} from "@/app/(admin)/_actions/events";
// Hooks
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Components
import { Edit, Loader, X } from "lucide-react";
import { PageTitle } from "@/app/(admin)/_components/page-title";
import { Form, FormLabel } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEventSchema } from "@/schema";
import { Event, Product } from "@/types";
import { SubmitButton } from "@/app/(admin)/_components/submit-button";

export default function EditEventComponent() {
  const router = useRouter();
  const { id } = useParams();

  const getEventQuery = useQuery({
    queryKey: ["events", "me", id],
    queryFn: ({ queryKey }) => getMeEvent(queryKey[2] as string),
  });

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditEventSchema>) =>
      updateMeEvent(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Event Updated successfully!");
        //router.push('/admin/events')
        return;
      }
      toast.error("Couldnot update event!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const event: Event = getEventQuery.data?.data?.data;

  const form = useForm({
    defaultValues: {
      title: event?.title ?? event?.title,
      description: event?.description ?? event?.description,
      duration: event?.duration ?? event?.duration,
    },
    resolver: zodResolver(EditEventSchema),
  });

  const { register } = form;

  const updateEventHandler = () => {
    updateMutation.mutate(form.getValues());
  };

  useEffect(() => {
    if (event) {
      form.setValue("title", event?.title);
      form.setValue("description", event?.description);
      form.setValue("duration", event?.duration);
    }
  }, [event]);

  return (
    <div className="flex justify-center flex-col items-center py-4   ">
      {event && (
        <Form {...form}>
          <PageTitle
            icon={Edit}
            label={<span className="flex items-center gap-2">Edit Event</span>}
          />

          <form
            onSubmit={form.handleSubmit(updateEventHandler)}
            className="flex flex-col gap-y-3 mt-5 w-[50%]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={event?.title}
                      {...field}
                      type="text"
                      placeholder="Title"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-none"
                      rows={7}
                      defaultValue={event?.description}
                      {...field}
                      placeholder="Description"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Duration <span>(days)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={event?.duration}
                      {...register("duration", {
                        valueAsNumber: true,
                      })}
                      type="text"
                      placeholder="Duration"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton status={updateMutation.status} label="update" />
          </form>
        </Form>
      )}
    </div>
  );
}
