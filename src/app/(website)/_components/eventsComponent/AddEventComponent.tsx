"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { getProducts } from "@/app/(admin)/_actions/products";
import { addEvent, getEvent, updateEvent } from "@/app/(admin)/_actions/events";

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
import { addEventSchema } from "@/schema";
import { Event, Product } from "@/types";
import { SubmitButton } from "@/app/(admin)/_components/submit-button";

export const AddEventComponent = () => {
  const router = useRouter();

  const addMutation = useMutation({
    mutationFn: (values: zod.infer<typeof addEventSchema>) => addEvent(values),
    onSuccess: (d) => {
      if (d.data?.code === 201) {
        toast.success("Event created successfully!");
        router.push("/events?type=artist");
        return;
      }
      toast.error("Couldnot update event!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
        return;
      }
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      duration: undefined,
      began: "",
      coverImage: "",
    },
    resolver: zodResolver(addEventSchema),
  });

  const { register } = form;

  const updateEventHandler = () => {
    const { duration, began } = form.getValues();
    addMutation.mutate({
      ...form.getValues(),
      duration: parseInt(duration as any),
      //   began:began,
    });
  };

  return (
    <div className="flex justify-center flex-col items-center py-4   ">
      <Form {...form}>
        <PageTitle
          icon={Edit}
          label={<span className="flex items-center gap-2 ">Add Event</span>}
        />

        <form
          onSubmit={form.handleSubmit(updateEventHandler)}
          className="flex flex-col gap-y-3 mt-5 w-[50%] min-w-[400px] mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.title}
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
                    //   defaultValue={event?.description}
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
                    //   defaultValue={event?.duration}
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

          <FormField
            control={form.control}
            name="began"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Began</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.Began}
                    {...field}
                    type="date"
                    placeholder="Began"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose picture</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e: any) => {
                      form.setValue("coverImage", e?.currentTarget?.files[0]);
                      //   setPic(e?.currentTarget?.files[0]);
                    }}
                    type="file"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton status={addMutation.status} label="Add" />
        </form>
      </Form>
    </div>
  );
};
