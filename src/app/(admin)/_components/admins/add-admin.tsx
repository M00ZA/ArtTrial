"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";

// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { ChangeEvent, useEffect } from "react";

// Components
import { Loader, Plus, PlusCircle } from "lucide-react";
import { PageTitle } from "../page-title";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddAdminSchema } from "@/schema";
import { addAdmin } from "../../_actions/admins";
import { ROLES } from "@/lib/constants";
import { captilize } from "@/lib/utils";

export const AddAdminComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (values: zod.infer<typeof AddAdminSchema>) => addAdmin(values),
    onSuccess: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(captilize(d?.response?.data?.message));
      }
      if (d.data?.code === 201) {
        toast.success("Admin Added successfully!");
        router.push("/admin/admins");
        return;
      } else {
        console.log({ d });
      }
    },
    onError: (error: any) => {
      if (error?.response?.data?.message) {
        toast.error(captilize(error?.response?.data?.message));
      }
    },
  });

  const form = useForm({
    defaultValues: {
      picture: undefined,
      name: "",
      nId: "",
      phone: "",
      username: "",
      password: "",
      passwordConfirm: "",
      role: "",
      gender: "",
    },
    resolver: zodResolver(AddAdminSchema),
  });

  const addAdminHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["admins"] });
    addMutation.mutate(form.getValues());
    console.log(form.getValues());
  };

  return (
    <div>
      <Form {...form}>
        <PageTitle
          icon={PlusCircle}
          label={<span className="flex items-center gap-2">Add Admin</span>}
        />

        <form
          onSubmit={form.handleSubmit(addAdminHandler)}
          className="flex flex-col gap-y-3 mt-5 w-[50%]"
        >
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e: any) =>
                      form.setValue("picture", e?.target.files[0])
                    }
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
                <FormLabel>Full-Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Albert Eintesin" />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National ID</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="xxxx xxxx xxxx xx"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>username</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="@username" />
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
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="010 1111 1111" />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*******" />
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
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="*******" />
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
                <FormLabel>Choose a gender</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Gender</SelectLabel>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose a Role</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Role</SelectLabel>
                        {ROLES.filter((role: string) => role != "CEO").map(
                          (role: string) => (
                            <SelectItem value={role}>{role}</SelectItem>
                          )
                        )}
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
            disabled={addMutation.status === "pending" ? true : false}
            className="w-fit"
          >
            <span>
              {addMutation.status === "pending" ? (
                <Loader className="animate-spin mr-3" />
              ) : (
                false
              )}
            </span>
            <span>Create Admin</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
