"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 
import { getAdmin, updateAdmin } from '../../_actions/admins';

// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

// Components
import { Edit, Loader } from "lucide-react";
import { PageTitle } from "../page-title";
import { Form, FormLabel } from "@/components/ui/form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { Admin } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditAdminSchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';
import { ROLES } from '@/lib/constants';

export const EditAdminComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const getAdminQuery = useQuery({
    queryKey: ['admins', id],
    queryFn: ({ queryKey }) => getAdmin(queryKey[1] as string)
  })
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditAdminSchema>) => updateAdmin(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Admin Updated successfully!")
        router.push('/admin/admins')
        return;
      }
      toast.error("Couldnot update admin!")
    }
  })

  const admin: Admin = getAdminQuery.data?.data?.data?.admin

  console.log({admin})

  const form = useForm({
    defaultValues: {
      name: admin?.name ?? admin?.name,
      phone: admin?.phone ?? admin?.phone,
      role: admin?.role ?? admin?.role,
      gender: admin?.gender ?? admin?.gender
    },
    resolver: zodResolver(EditAdminSchema)
  })

  const updateAdminHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['admins'] })
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (admin) {
      form.setValue('name', admin?.name);
      form.setValue('role', admin?.role);
      form.setValue('phone', admin?.phone);
      form.setValue('gender', admin?.gender);
    }
  }, [admin]);

  return (
    <div>

      {!admin && getAdminQuery.isLoading && (
        <EditAdminComponent.LoadingSkeleton />
      )}

      {admin && (

        <Form {...form}>
          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit Admin <Link className='text-sm text-gray-400 font-normal' href={`/admin/admins/${admin?.id}/view`}>/{admin?.name} ({admin.role})</Link></span>} />

          <form onSubmit={form.handleSubmit(updateAdminHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select  defaultValue={admin?.role} {...field} onValueChange={ (e: any) => form.setValue('role', e) }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Roles</SelectLabel>
                          {ROLES.filter((role: string) => role != 'CEO').map((role: string) => (
                            <SelectItem value={role}>{role}</SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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


EditAdminComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit Admin</span>
        <Skeleton 
          className='w-[180px] h-3'
        />
      </h3>

      <FormSkeleton width='50%' numberOfInputs={3} />

    </div>
  )
}