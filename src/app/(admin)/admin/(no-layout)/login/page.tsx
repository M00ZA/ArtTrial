"use client";

import * as zod from "zod";
import axios from "axios";
import Image from "next/image";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { AdminLoginSchema } from "@/schema";

import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@/lib/constants";

const AdminLoginPage = () => {
  const router = useRouter();

  const form = useForm<zod.infer<typeof AdminLoginSchema>>({
    defaultValues: {
      username: "mohamed",
      password: "Mohammed2002",
    },
    resolver: zodResolver(AdminLoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (values: zod.infer<typeof AdminLoginSchema>) =>
      axios
        .post(`${API_URL}admins/login`, values)
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.data?.token) {
        toast.success("Admin found!");
        setCookie("token", data?.data?.token);
        router.push("/admin/dashboard");
        console.log("Hello From the other side");
      } else {
        toast.error(data.response.data.error_msg);
      }
    },
  });

  const loginHandler = () => {
    loginMutation.mutate(form.getValues());
  };

  return (
    <div className="grid grid-cols-2 gap-4 w-full h-full">
      <div className="bg-gray-100 p-[200px]">
        <h1 className="text-5xl font-semibold uppercase mb-10">Login</h1>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(loginHandler)}
              className="flex flex-col gap-y-3"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                        <Input
                          {...field}
                          placeholder="username"
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

              <Button
                className="w-full"
                disabled={loginMutation.status === "pending"}
              >
                {loginMutation.status === "pending" && (
                  <Loader className="animate-spin mr-2" />
                )}
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="p-[200px]">
        <Image
          src="/defaults/login-admin.svg"
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default AdminLoginPage;
