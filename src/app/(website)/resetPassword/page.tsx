"use client";
import { API_URL } from "@/lib/constants";
import { resetPassword } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { setCookie } from "cookies-next";

import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader, LockKeyhole, User } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSearchType } from "@/hooks/useSearchParamsType";

export default function Login() {
  const router = useRouter();
  const { type, endpoint } = useSearchType(
    "artistAuth/resetPassword",
    "userAuth/resetPassword"
  );
  const form = useForm<Zod.infer<typeof resetPassword>>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(resetPassword),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (values: zod.infer<typeof resetPassword>) =>
      axios
        .put(`${API_URL}${endpoint}`, values)
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.data?.token) {
        toast.success("Password changed successfully!");
        setCookie("token", data?.data?.token);
        router.push("/" + "?type=" + type);
        console.log("Hello From the other side");
      } else {
        toast.error(data.response.data.error_msg);
      }
    },
  });

  const loginHandler = () => {
    resetPasswordMutation.mutate(form.getValues());
  };

  return (
    <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4 w-full h-full">
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <h1 className="text-xl font-semibold uppercase mb-4">
            Create New Password
          </h1>
          <p className="mb-4 text-gray-400">
            You can't reuse your previous password here
          </p>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(loginHandler)}
                className="flex flex-col gap-y-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                          <Input
                            {...field}
                            placeholder="email"
                            className="pl-12"
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
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <LockKeyhole className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Password"
                            className="pl-12"
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
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <LockKeyhole className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="confirm password"
                            className="pl-12"
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
                  disabled={resetPasswordMutation.status === "pending"}
                >
                  {resetPasswordMutation.status === "pending" && (
                    <Loader className="animate-spin mr-2" />
                  )}
                  Change password
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/reset-password.svg"
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div>
    </div>
  );
}
