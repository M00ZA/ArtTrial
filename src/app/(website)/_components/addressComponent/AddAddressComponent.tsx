"use client";
import { API_URL } from "@/lib/constants";
import { userAddressSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { getCookie, setCookie } from "cookies-next";

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

import { Loader, LockKeyhole, Mail, Phone, User } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { headers } from "@/lib/utils";

export default function AddAddressComponent() {
  const router = useRouter();

  const form = useForm<Zod.infer<typeof userAddressSchema>>({
    defaultValues: {
      alias: "Home",
      street: "الخانكه",
      region: "ابو زعبل",
      city: "قليوبيه",
      country: "مصر",
      postalCode: "0020",
      phone: "01078781033",
    },
    resolver: zodResolver(userAddressSchema),
  });
  const token = getCookie("token");
  const addressMutation = useMutation({
    mutationFn: (values: zod.infer<typeof userAddressSchema>) =>
      axios
        .post(`${API_URL}${"users/address"}`, values, headers(token))
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.code == 201 || data?.code == 200) {
        toast.success("address added successfully");
        router.push("/profile/address");
      } else {
        toast.error(data.response.data.error_msg);
      }
    },
  });

  const addAddressHandler = () => {
    addressMutation.mutate(form.getValues());
  };

  return (
    // <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4 w-full h-screen">
    <div className="bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="w-[300px]">
        <h1 className="text-3xl font-semibold  mb-8 text-center">
          Add Address
        </h1>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(addAddressHandler)}
              className="flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="alias"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="alias"
                          // className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="country"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="region"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="city"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="street"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        {/* <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          placeholder="postalCode"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Phone Number</FormLabel> */}
                    <FormControl>
                      <div className="relative">
                        {/* <Phone className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" /> */}
                        <Input
                          {...field}
                          type="text"
                          placeholder="Phone Number"
                          //   className="pl-12"
                        />
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="w-full"
                disabled={addressMutation.status === "pending"}
              >
                {addressMutation.status === "pending" && (
                  <Loader className="animate-spin mr-2" />
                )}
                Add Address
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
  {
    /* <div className="flex flex-col items-center justify-center">
        <Image
          src="/landing-login.svg"
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div> */
  }
  // </div>
  //   );
}
