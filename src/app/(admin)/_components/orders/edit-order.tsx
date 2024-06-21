"use client";

import OrderComponet from "@/app/(website)/_components/orderComponent/OrderComponent";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdmin } from "@/hooks/useAdmin";
import { Image, Lock, UserIcon } from "lucide-react";

// Helpers
import { toast } from "sonner";

// Hooks
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Components
import { Loader } from "lucide-react";
import {
  Form,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { changeOrderStateSchema } from "@/schema";
import {
  updateOrderState,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../../_actions/orders";
export const EditOrderComponent = () => {
  const { id } = useParams();
  const router = useRouter();

  const updateOrderStateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof changeOrderStateSchema>) =>
      updateOrderState(id as string, values),
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data?.code === 200) {
        toast.success("order state Updated successfully!");
        router.push("/admin/orders");
        // router.push("/admin/profile");
        // refetch();
        return;
      }
      toast.error("Couldn't update order state!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateToPaidMutation = useMutation({
    mutationFn: () => updateOrderToPaid(id as string),
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data?.code === 200) {
        toast.success("order Updated to paid successfully!");
        router.push("/admin/orders");
        // router.push("/admin/profile");
        // refetch();
        return;
      }
      toast.error("Couldn't update order to paid!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const updateToDeliveredMutation = useMutation({
    mutationFn: () => updateOrderToDelivered(id as string),
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data?.code === 200) {
        toast.success("order Updated to delivered successfully!");
        router.push("/admin/orders");
        // refetch();
        return;
      }
      toast.error("Couldn't update order to delivered!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: {
      state: "",
    },
    resolver: zodResolver(changeOrderStateSchema),
  });

  // useEffect(() => {
  //   if (admin) {
  //     form.setValue("name", admin?.name);
  //     form.setValue("gender", admin?.gender);
  //     form.setValue("phone", admin?.phone);
  //   }
  // }, [admin]);

  const updateOrderStateHandler = () => {
    updateOrderStateMutation.mutate(form.getValues());
  };

  return (
    <div>
      <div className="w-full px-4 pb-4 max-w-[420px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(updateOrderStateHandler)}
            className="flex flex-col gap-y-1 mt-5"
          >
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Select
                      // defaultValue={admin?.gender}
                      {...field}
                      onValueChange={(e: any) => form.setValue("state", e)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select order state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>State</SelectLabel>
                          <SelectItem value={"Pending"}>Pending</SelectItem>
                          <SelectItem value={"Confirmed"}>Confirmed</SelectItem>
                          <SelectItem value={"Shipped"}>Shipped</SelectItem>
                          <SelectItem value={"Completed"}>Completed</SelectItem>
                          <SelectItem value={"Canceled"}>Canceled</SelectItem>
                          <SelectItem value={"Refunded"}>Refunded</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              disabled={
                updateOrderStateMutation.status === "pending" ? true : false
              }
              className="w-fit text-xs"
            >
              <span>
                {updateOrderStateMutation.status === "pending" ? (
                  <Loader className="size-4 animate-spin mr-3" />
                ) : (
                  false
                )}
              </span>
              <span>Update</span>
            </Button>
          </form>
        </Form>
        <Button
          onClick={() => {
            updateToPaidMutation.mutate();
          }}
          size="sm"
          disabled={updateToPaidMutation.status === "pending" ? true : false}
          className="w-fit text-xs"
        >
          <span>
            {updateToPaidMutation.status === "pending" ? (
              <Loader className="size-4 animate-spin mr-3" />
            ) : (
              false
            )}
          </span>
          <span>Update to paid</span>
        </Button>
        <Button
          onClick={() => {
            updateToDeliveredMutation.mutate();
          }}
          size="sm"
          disabled={
            updateToDeliveredMutation.status === "pending" ? true : false
          }
          className="w-fit text-xs"
        >
          <span>
            {updateToDeliveredMutation.status === "pending" ? (
              <Loader className="size-4 animate-spin mr-3" />
            ) : (
              false
            )}
          </span>
          <span>Update to delivered</span>
        </Button>
      </div>
      <OrderComponet />
    </div>
  );
};
