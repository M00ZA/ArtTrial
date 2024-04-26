"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 
import { getSubject, updateSubject } from '../../_actions/subjects';



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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { Subject } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditSubjectSchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';

export const EditSubjectComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const getSubjectQuery = useQuery({
    queryKey: ['subjects', id],
    queryFn: ({ queryKey }) => getSubject(queryKey[1] as string)
  })
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditSubjectSchema>) => updateSubject(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Subject Updated successfully!")
        router.push('/admin/subjects')
        return;
      }
      toast.error("Couldnot update subject!")
      console.log(d)
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })

  const subject: Subject = getSubjectQuery.data?.data?.data?.subject


  const form = useForm({
    defaultValues: {
      title: subject?.title ?? subject?.title,
      slug: subject?.slug ?? subject?.slug,
    },
    resolver: zodResolver(EditSubjectSchema)
  })

  const updateSubjectHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['subjects'] })
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (subject) {
      form.setValue('title', subject?.title);
      form.setValue('slug', subject?.slug);
    }
  }, [subject]);

  return (
    <div>

      {!subject && getSubjectQuery.isLoading && (
        <EditSubjectComponent.LoadingSkeleton />
      )}

      {subject && (

        <Form {...form}>
          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit Subject <Link className='text-sm text-gray-400 font-normal' href={`/admin/subjects/${subject?._id}/view`}>/{subject?.title} ({subject.slug})</Link></span>} />

          <form onSubmit={form.handleSubmit(updateSubjectHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={subject?.title} {...field} type='text' placeholder='Name' />
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

EditSubjectComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit Subject</span>
        <Skeleton 
          className='w-[180px] h-3'
        />
      </h3>

      <FormSkeleton width='50%' numberOfInputs={1} />

    </div>
  )
}