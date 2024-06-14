"use client";

// Helpers
import { toast } from "sonner";

// Hooks
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateMyAdminPassword } from "@/schema";
import { updateUserPassword } from "@/actions/users";
import { deleteCookie } from "cookies-next";

const ChangePasswordComponent = () => {
  const router = useRouter();

  const updatePasswordMutation = useMutation({
    mutationFn: (values: zod.infer<typeof UpdateMyAdminPassword>) =>
      updateUserPassword(values),
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data?.code === 200) {
        toast.success(
          "User Password Changed successfully!, Please login using your new password",
          {
            onAutoClose: () => {
              localStorage.setItem("loggedInAs", "");
              localStorage.setItem("memberProfile", "");
              deleteCookie("token");
              router.push(`/loginType`);
            },
          }
        );

        return;
      }
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(UpdateMyAdminPassword),
  });

  const updatePasswordHandler = () => {
    updatePasswordMutation.mutate(passwordForm.getValues());
  };

  return (
    <div className="flex">
      <div className="w-1/2 md:w-1/3 px-4 pb-2 mx-auto">
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(updatePasswordHandler)}
            className="flex flex-col gap-y-1 mt-5"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Current Password"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="**** ****" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={passwordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" placeholder="**** ****" />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              disabled={
                updatePasswordMutation.status === "pending" ? true : false
              }
              className="w-fit text-xs"
            >
              <span>
                {updatePasswordMutation.status === "pending" ? (
                  <Loader className="size-4 animate-spin mr-3" />
                ) : (
                  false
                )}
              </span>
              <span>Change Password</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

ChangePasswordComponent.Error = () => {
  return <div>Error</div>;
};

ChangePasswordComponent.Loading = () => {
  return <div>Loading</div>;
};

export default ChangePasswordComponent;
