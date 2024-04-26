"use client"

// NextJS
import Link from 'next/link';
import Image from 'next/image';

// Helpers
import { toast } from 'sonner'; 
import { getUser, updateUser } from "../../_actions/users";

// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';

// Components
import { Edit, Loader } from "lucide-react";
import { PageTitle } from "../page-title";
import { Form, FormLabel } from "@/components/ui/form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { User } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditUserSchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';
import { API_URL } from '@/lib/constants';

export const EditUserComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()


  const getUserQuery = useQuery({
    queryKey: ['users', id],
    queryFn: ({ queryKey }) => getUser(queryKey[1] as string)
  })

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditUserSchema>) => updateUser(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("User Updated successfully!")
        router.push('/admin/users')
        return;
      }
      toast.error("Couldnot update user!")
    }
  })

  const user: User = getUserQuery.data?.data?.getUser
  console.log(user);
  const form = useForm({
    defaultValues: {
      userName: user?.userName ? user.userName:"",
      phoneNumber: user?.phoneNumber ?? user?.phoneNumber,
      // profileImg: ''
    },
    resolver: zodResolver(EditUserSchema)
  })

  const updateUserHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] })
    console.log(form.getValues())
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (user) {
      form.setValue('userName', user?.userName||"");
      form.setValue('phoneNumber', user?.phoneNumber);
    }
  }, [user]);

  console.log(user)

  return (
    <div>

      {!user && getUserQuery.isLoading && (
        <EditUserComponent.LoadingSkeleton />
      )}

      {user && (

        <Form {...form}>
          
          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit User <Link className='text-sm text-gray-400 font-normal' href={`/admin/users/${user?._id}/view`}>/{user?.name} ({user.email})</Link></span>} />

          {/* <Image alt='ixsd' width={100} height={100} src={`${API_URL}${user.profileImg}`} /> */}

          <form onSubmit={form.handleSubmit(updateUserHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

            {/* <FormField
              control={form.control}
              name="profileImg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormControl>
                    <Input onChange={ (e: ChangeEvent<HTMLInputElement>) => {
                      form.setValue('profileImg', e?.target?.files?.[0] as any)
                    }} type='file' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full-Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={user?.name} {...field} type='text' placeholder='Name' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input defaultValue={user?.phoneNumber} {...field} type='text' placeholder='Phone Number' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={updateMutation.status === 'pending' ? true : false} className='w-fit'>
              <span>{updateMutation.status === 'pending' ? <Loader className='animate-spin mr-3' /> : false}</span>
              <span>Update</span>
            </Button>

          </form>

        </Form>
      )} 
    </div>
  );
}


EditUserComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit User</span>
        <Skeleton 
          className='w-[180px] h-3'
        />
      </h3>

      <FormSkeleton width='50%' numberOfInputs={3} />

    </div>
  )
}