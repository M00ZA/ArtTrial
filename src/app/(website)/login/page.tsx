"use client";
import { API_URL } from "@/lib/constants";
import { userLoginSchema } from "@/schema";
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

import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const type = useSearchParams().get("type");
  const endpoint = type == "artist" ? "artistAuth/login" : "userAuth/login";
  const form = useForm<Zod.infer<typeof userLoginSchema>>({
    defaultValues: {
      email: "mohamedabdelstar30@gmail.com",
      password: "#Mohammed2002",
    },
    resolver: zodResolver(userLoginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (values: zod.infer<typeof userLoginSchema>) =>
      axios
        .post(`${API_URL}${endpoint}`, values)
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.data?.token) {
        toast.success("User found!");
        setCookie("token", data?.data?.token);
        router.push("/" + "?type=" + type);
      } else {
        toast.error(data.response.data.error_msg);
      }
    },
  });

  const loginHandler = () => {
    loginMutation.mutate(form.getValues());
  };

  return (
    <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4 w-full h-screen">
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <h1 className="text-3xl font-semibold uppercase mb-8">Login</h1>

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
                <Link href={"/forgetPassword" + "?type=" + type}>
                  <p className="text-primary">Forget password ?</p>
                </Link>

                <Button
                  className="w-full"
                  disabled={loginMutation.status === "pending"}
                >
                  {loginMutation.status === "pending" && (
                    <Loader className="animate-spin mr-2" />
                  )}
                  Login
                </Button>
                <p className="text-gray-400">
                  don't have an account?{" "}
                  <Link href={"/signup" + "?type=" + type}>
                    {" "}
                    <span className="text-primary">Register</span>
                  </Link>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/landing-login.svg"
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div>
    </div>
  );
}
