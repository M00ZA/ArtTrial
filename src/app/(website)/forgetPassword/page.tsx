"use client";
import { API_URL } from "@/lib/constants";
import { forgetPassword } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as zod from "zod";

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
import { useSearchType } from "@/hooks/useSearchParamsType";

export default function ForgetPassword() {
  const router = useRouter();
  const { type, endpoint } = useSearchType(
    "artistAuth/forgotPassword",
    "userAuth/forgotPassword"
  );

  const form = useForm<Zod.infer<typeof forgetPassword>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPassword),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (values: zod.infer<typeof forgetPassword>) =>
      axios
        .post(`${API_URL}${endpoint}`, values)
        .then((d) => d.data)
        .catch((err) => err),
    onSuccess: (data, variable, context) => {
      console.log(data);
      console.log(variable);
      if (data?.code == 200) {
        toast.success("Reset code sent to email !");
        // setCookie("token", data?.data?.token);
        router.push("/verifyReset" + "?type=" + type);
      } else {
        // toast.error(data.response.data.error_msg);
        if (data?.response?.data?.message) {
          toast.error(data?.response?.data?.message);
        }
      }
    },
  });

  const submitHandler = () => {
    forgotPasswordMutation.mutate(form.getValues());
  };

  return (
    <div className="grid grid-rows-2 grid-cols-1 lg:grid-rows-1 lg:grid-cols-2 gap-4 w-full h-screen">
      <div className="bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-[300px]">
          <h1 className="text-xl font-semibold uppercase mb-4">
            Forget Password?
          </h1>
          <p className="mb-4 text-gray-400">
            Please enter the email address associated with your account
          </p>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitHandler)}
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

                <Button
                  className="w-full"
                  disabled={forgotPasswordMutation.status === "pending"}
                >
                  {forgotPasswordMutation.status === "pending" && (
                    <Loader className="animate-spin mr-2" />
                  )}
                  Send
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/forgot-password.svg"
          width={300}
          height={300}
          alt="Image"
          className="mx-auto"
        />
      </div>
    </div>
  );
}
