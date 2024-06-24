"use client";
import { API_URL } from "@/lib/constants";
import { userSignupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as zod from "zod";

import { setCookie } from "cookies-next";

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

export default function Signup() {
  const router = useRouter();
  const type = useSearchParams().get("type");
  const endpoint = type == "artist" ? "artistAuth/signup" : "userAuth/signup";
  const form = useForm<Zod.infer<typeof userSignupSchema>>({
    defaultValues: {
      name: "",
      password: "",
      passwordConfirm: "",
      phone: "",
      email: "",
      gender: "",
    },
    resolver: zodResolver(userSignupSchema),
  });

  const loginMutation = useMutation({
    mutationFn: (values: zod.infer<typeof userSignupSchema>) =>
      axios
        .postForm(`${API_URL}${endpoint}`, values)
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.code == 201) {
        toast.success("signup successfully, verify your email");
        router.push("/verifyEmail" + "?type=" + type);
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
          <h1 className="text-3xl font-semibold uppercase mb-8">Register</h1>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(loginHandler)}
                className="flex flex-col gap-y-3"
              >
                <FormField
                  control={form.control}
                  name="profileImg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose profile image</FormLabel>
                      <FormControl>
                        <Input
                          onChange={(e: any) => {
                            form.setValue(
                              "profileImg",
                              e?.currentTarget?.files[0]
                            );
                            //   setPic(e?.currentTarget?.files[0])
                          }}
                          type="file"
                          placeholder="Choose profile image"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <User className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                          <Input
                            {...field}
                            placeholder="name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Mail className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Phone Number</FormLabel> */}
                      <FormControl>
                        <div className="relative">
                          <Phone className="text-gray-400 absolute top-1/2 transform -translate-y-1/2 left-3" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Phone Number"
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
                            placeholder="Confirm password"
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
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Gender</FormLabel> */}
                      <FormControl>
                        <Select
                          //   defaultValue={admin?.gender}
                          {...field}
                          onValueChange={(e: any) => form.setValue("gender", e)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gender</SelectLabel>
                              <SelectItem value={"male"}>Male</SelectItem>
                              <SelectItem value={"female"}>Female</SelectItem>
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
                  className="w-full"
                  disabled={loginMutation.status === "pending"}
                >
                  {loginMutation.status === "pending" && (
                    <Loader className="animate-spin mr-2" />
                  )}
                  Register
                </Button>
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
