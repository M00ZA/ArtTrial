"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAdmin } from "@/hooks/useAdmin"
import { Image, Lock, UserIcon } from "lucide-react";

// Helpers
import { toast } from 'sonner'; 

// Hooks
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Components
import { Loader } from "lucide-react";
import { Form, FormLabel, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { UpdateMyAdminProfileSchema, UpdateAdminImage, UpdateMyAdminPassword } from '@/schema';
import { updateAdminAccount, updateAdminPassword, updateAdminPicture } from "../../_actions/admins";

const ProfilePageComponent = () => {
  const router = useRouter()
  const { admin, isLoading, refetch } = useAdmin()

  console.log({admin})

  const [pic, setPic] = useState<File>()

  const changeImageMutation = useMutation({
    mutationFn: (image: any) => updateAdminPicture(image),
    onSuccess: (res: any) => {
      if (res.data?.code === 200) {
        toast.success(res.data?.message)
        router.push('/admin/profile')
        refetch()
        return;
      }
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof UpdateMyAdminProfileSchema>) => updateAdminAccount(values),
    onSuccess: (res: any) => {
      console.log(res)
      if (res.data?.code === 200) {
        toast.success("Admin Updated successfully!")
        router.push('/admin/profile')
        refetch()
        return;
      }
      toast.error("Couldn't update My Information!")
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (values: zod.infer<typeof UpdateMyAdminPassword>) => updateAdminPassword(values),
    onSuccess: (res: any) => {
      console.log(res)
      if (res.data?.code === 200) {
        toast.success("Admin Password Changed successfully!")
        router.push('/admin/profile')
        refetch()
        return;
      }
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })

  const form = useForm({
    defaultValues: {
      name: admin?.name ?? admin?.name,
      phone: admin?.phone ?? admin?.phone,
      gender: admin?.gender ?? admin?.gender,
    },
    resolver: zodResolver(UpdateMyAdminProfileSchema)
  })

  const passwordForm = useForm({
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(UpdateMyAdminPassword)
  })

  const pictureForm = useForm({
    defaultValues: {
      profileImg: undefined
    },
    resolver: zodResolver(UpdateAdminImage)
  })

  const pictureActionHandler = () => {
    const formData = new FormData()
    //@ts-ignore
    formData.append('profileImg', pic)
    changeImageMutation.mutate(formData)
  }

  const updateAdminHandler = () => {
    updateMutation.mutate(form.getValues())
  }

  const updatePasswordHandler = () => {
    updatePasswordMutation.mutate(passwordForm.getValues())
  }

  useEffect(() => {
    if (admin) {
      form.setValue('name', admin?.name);
      form.setValue('gender', admin?.gender);
      form.setValue('phone', admin?.phone);
    }
  }, [admin]);

  if (isLoading) return <ProfilePageComponent.Loading />
  if (!admin) return <ProfilePageComponent.Error />

  return (
    <div className=''>
      <header className='flex gap-2 items-center'>
        <Avatar className='size-12'>
          {<AvatarImage src={admin?.profileImg?.secure_url} alt="@shadcn" />}
          <AvatarFallback>{admin?.name[0]}</AvatarFallback>
        </Avatar>
        <h5 className='font-semibold'>
          <span>{admin?.name}</span>
          <span className='text-xs font-normal text-gray-400 block'>@{admin?.userName}</span>
        </h5>
      </header>

      {/* Settings Along Page */}
      <div className='divide-y py-6'>
        
        {/* Profile Picture */}
        <div className='flex'>
          <div className='w-[400px] flex gap-2 border-r'>
            <Image className='mt-4 mr-3' />
            <h4 className='mt-4 font-semibold text-lg text-gray-500'> Profile Picture</h4>
          </div>

          <div className='w-full px-4 pb-2'>

            <Form {...pictureForm}>

              <form onSubmit={pictureForm.handleSubmit(pictureActionHandler)} className='flex flex-col gap-y-1 mt-5'>

                <FormField
                  control={pictureForm.control}
                  name="profileImg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose picture</FormLabel>
                      <FormControl>
                        <Input onChange={ (e: any) => {
                          pictureForm.setValue('profileImg', e?.currentTarget?.files[0])
                          setPic(e?.currentTarget?.files[0])
                        }} type='file' />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size='sm' disabled={changeImageMutation.status === 'pending' ? true : false} className='w-fit text-xs'>
                  <span>{changeImageMutation.status === 'pending' ? <Loader className='size-4 animate-spin mr-3' /> : false}</span>
                  <span>Change</span>
                </Button>

              </form>

            </Form>

          </div>
          
        </div>
        
        {/* Personal Information */}
        <div className='flex'>
          
          <div className='w-[400px] flex gap-2 border-r'>
            <UserIcon className='mt-4 mr-3' />
            <h4 className='mt-4 font-semibold text-lg text-gray-500'>Account Information</h4>
          </div>

          <div className='w-full px-4 pb-4'>
            <Form {...form}>

              <form onSubmit={form.handleSubmit(updateAdminHandler)} className='flex flex-col gap-y-1 mt-5'>

                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full-Name</FormLabel>
                      <FormControl>
                        <Input defaultValue={admin?.name} {...field} type='text' placeholder='Name' />
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
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select defaultValue={admin?.gender} {...field} onValueChange={ (e: any) => form.setValue('gender', e) }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Gender</SelectLabel>
                              <SelectItem value={'male'}>Male</SelectItem>
                              <SelectItem value={'female'}>Female</SelectItem>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input defaultValue={admin?.phone} {...field} type='text' placeholder='Phone Number' />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size='sm' disabled={updateMutation.status === 'pending' ? true : false} className='w-fit text-xs'>
                  <span>{updateMutation.status === 'pending' ? <Loader className='size-4 animate-spin mr-3' /> : false}</span>
                  <span>Update</span>
                </Button>

              </form>

            </Form>
          </div>
        </div>
        
        {/* Change Password */}
        <div className='flex'>
          <div className='w-[400px] flex gap-2 border-r'>
            <Lock className='mt-4 mr-3' />
            <h4 className='mt-4 font-semibold text-lg text-gray-500'> Change Password</h4>
          </div>
          <div className='w-full px-4 pb-2'>
            <Form {...passwordForm}>

              <form onSubmit={passwordForm.handleSubmit(updatePasswordHandler)} className='flex flex-col gap-y-1 mt-5'>

                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input {...field} type='text' placeholder='Current Password' />
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
                        <Input {...field} type='text' placeholder='**** ****' />
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
                        <Input {...field} type='text' placeholder='**** ****' />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button size='sm' disabled={updatePasswordMutation.status === 'pending' ? true : false} className='w-fit text-xs'>
                  <span>{updatePasswordMutation.status === 'pending' ? <Loader className='size-4 animate-spin mr-3' /> : false}</span>
                  <span>Change Password</span>
                </Button>

              </form>

            </Form>
          </div>
        </div>

      </div>

    </div>
  );
}

ProfilePageComponent.Error = () => {
  return (
    <div>Error</div>
  )
}
 
ProfilePageComponent.Loading = () => {
  return (
    <div>Loading</div>
  )
}
 
export default ProfilePageComponent;