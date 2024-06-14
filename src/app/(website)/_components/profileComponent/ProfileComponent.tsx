"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAdmin } from "@/hooks/useAdmin";
import { Image, Lock, UserIcon } from "lucide-react";

// Helpers
import { toast } from "sonner";

// Hooks
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateMyAdminProfileSchema,
  UpdateAdminImage,
  UpdateMyAdminPassword,
  UpdateUserProfile,
} from "@/schema";
import { updateUserImg, updateUserProfile } from "@/actions/users";
import { User } from "@/types";
import { getProfile } from "@/actions/generic";
import { updateAdminPicture } from "@/app/(admin)/_actions/admins";
import LandingLoader from "../landingLoader/landingLoader";
import { Box } from "@mui/material";

const ProfilePageComponent = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const router = useRouter();
  //   const profileQuery = useQuery({
  //     queryKey: ["users", "profile"],
  //     queryFn: () => getProfile("users/getProfile"),
  //     // retry: false,
  //   });

  const userQueries = useQueries({
    queries: [
      {
        queryKey: ["users", "profile"],
        queryFn: () => getProfile("users/getProfile"),
      },
    ],
  });
  const profileQuery = userQueries[0];
  const { data, isError, isLoading, error, isFetched, refetch } = profileQuery;

  const user: User = data?.data?.data;

  const [pic, setPic] = useState<File>();

  const changeImageMutation = useMutation({
    mutationFn: (values: { profileImg: string }) => updateUserImg(values),
    onSuccess: (res: any) => {
      if (res.data?.code === 200) {
        // toast.success(res.data?.message);
        // refetch();
        toast.success("Image updated successfully!");
        queryClient.invalidateQueries({
          queryKey: ["users", "profile"],
          refetchType: "all",
        });
        setPic(undefined);
        toast.dismiss();
        // router.push("/profile");
        queryClient.resetQueries();
        queryClient.removeQueries();

        return;
      }
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof UpdateUserProfile>) =>
      updateUserProfile(values),
    onSuccess: (res: any) => {
      console.log(res);
      if (res.data?.code === 200) {
        toast.success("user updated successfully!");
        // router.push("/user/profile");
        queryClient.invalidateQueries({
          queryKey: ["users", "profile"],
          refetchType: "all",
        });
        // setPic(undefined);
        toast.dismiss();
        // refetch();
        // router.push("/profile");
        return;
      }
      toast.error("Couldn't update My Information!");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const form = useForm({
    defaultValues: {
      name: user?.name ?? user?.name,
      phone: user?.phone ?? user?.phone,
      email: user?.email ?? user?.email,
      profileImg: "",
    },
    resolver: zodResolver(UpdateUserProfile),
  });

  //   const pictureForm = useForm({
  //     defaultValues: {
  //       profileImg: undefined,
  //     },
  //     resolver: zodResolver(UpdateAdminImage),
  //   });

  //   const pictureActionHandler = () => {
  //     const formData = new FormData();
  //     //@ts-ignore
  //     formData.append("profileImg", pic);
  //     changeImageMutation.mutate(formData);
  //   };

  const updateUserHandler = () => {
    console.log(form.getValues());
    const userBasicInfo = {
      name: form.getValues().name,
      phone: form.getValues().phone,
      email: form.getValues().email,
    };
    updateMutation.mutate(userBasicInfo);
    changeImageMutation.mutate({ profileImg: form.getValues().profileImg });
  };

  useEffect(() => {
    console.log("uuuuuuuuuuuuuuuuuuuuuuuuuuuser");
    console.log(user);
    if (user) {
      form.setValue("name", user?.name);
      form.setValue("email", user?.email);
      form.setValue("phone", user?.phone);
      form.setValue("profileImg", user?.profileImg || "");
    }
  }, [user]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["users", "profile"],
      refetchType: "all",
    });
  }, [pathname]);

  if (isLoading) return <ProfilePageComponent.Loading />;
  if (!user) return <ProfilePageComponent.Error />;

  return (
    <div className="">
      <header className="flex gap-2 items-center justify-center	mt-6">
        <Avatar className="size-12">
          {
            <AvatarImage
              src={
                window && pic
                  ? window.URL.createObjectURL(pic)
                  : user?.profileImg
              }
              alt="@shadcn"
            />
          }
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <h5 className="font-semibold">
          <span>{user?.name}</span>
          <span className="text-xs font-normal text-gray-400 block">
            @{user?.email}
          </span>
        </h5>
      </header>

      {/* Settings Along Page */}
      <div className="divide-y py-6">
        {/* <div className="flex">
          <div className="w-[400px] flex gap-2 border-r">
            <Image className="mt-4 mr-3" />
            <h4 className="mt-4 font-semibold text-lg text-gray-500">
        
              Profile Picture
            </h4>
          </div>
        </div> */}

        {/* Personal Information */}
        {/* <div className="flex"> */}
        {/* <div className="w-[400px] flex gap-2 border-r">
            <UserIcon className="mt-4 mr-3" />
            <h4 className="mt-4 font-semibold text-lg text-gray-500">
              Account Information
            </h4>
          </div> */}

        <div className="w-full px-4 pb-4 max-w-3xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(updateUserHandler)}
              className="flex flex-col gap-y-1 "
            >
              <FormField
                control={form.control}
                name="profileImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose picture</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e: any) => {
                          form.setValue(
                            "profileImg",
                            e?.currentTarget?.files[0]
                          );
                          setPic(e?.currentTarget?.files[0]);
                        }}
                        type="file"
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
                      <Input
                        defaultValue={user?.name}
                        {...field}
                        type="text"
                        placeholder="Name"
                      />
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
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input
                        defaultValue={user?.email}
                        {...field}
                        type="text"
                        placeholder="Email"
                        disabled={true}
                      />
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
                      <Input
                        defaultValue={user?.phone}
                        {...field}
                        type="text"
                        placeholder="Phone Number"
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                size="sm"
                disabled={updateMutation.status === "pending" ? true : false}
                className="w-fit text-xs"
              >
                <span>
                  {updateMutation.status === "pending" ? (
                    <Loader className="size-4 animate-spin mr-3" />
                  ) : (
                    false
                  )}
                </span>
                <span>Update</span>
              </Button>
            </form>
          </Form>
        </div>
        {/* </div> */}

        {/* Change Password */}
        {/* <div className="flex">
          <div className="w-[400px] flex gap-2 border-r">
            <Lock className="mt-4 mr-3" />
            <h4 className="mt-4 font-semibold text-lg text-gray-500">
              {" "}
              Change Password
            </h4>
          </div>
     
        </div> */}
      </div>
    </div>
  );
};

ProfilePageComponent.Error = () => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        minHeight: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>Something went wrong please try again later</div>
    </Box>
  );
};

ProfilePageComponent.Loading = () => {
  return <LandingLoader />;
};

export default ProfilePageComponent;
