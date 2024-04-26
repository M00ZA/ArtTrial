"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 
import { getStyle, updateStyle } from '../../_actions/styles';



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
import { Style } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditStyleSchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';

export const EditStyleComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const getStyleQuery = useQuery({
    queryKey: ['styles', id],
    queryFn: ({ queryKey }) => getStyle(queryKey[1] as string)
  })
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditStyleSchema>) => updateStyle(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Style Updated successfully!")
        router.push('/admin/styles')
        return;
      }
      toast.error("Couldnot update style!")
      console.log(d)
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })

  const style: Style = getStyleQuery.data?.data?.data?.style


  const form = useForm({
    defaultValues: {
      title: style?.title ?? style?.title,
      slug: style?.slug ?? style?.slug,
    },
    resolver: zodResolver(EditStyleSchema)
  })

  const updateStyleHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['styles'] })
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (style) {
      form.setValue('title', style?.title);
      form.setValue('slug', style?.slug);
    }
  }, [style]);

  return (
    <div>

      {!style && getStyleQuery.isLoading && (
        <EditStyleComponent.LoadingSkeleton />
      )}

      {style && (

        <Form {...form}>
          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit Style<Link className='text-sm text-gray-400 font-normal' href={`/admin/styles/${style?._id}/view`}>/{style?.title} ({style.slug})</Link></span>} />

          <form onSubmit={form.handleSubmit(updateStyleHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={style?.title} {...field} type='text' placeholder='Name' />
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

EditStyleComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit Style</span>
        <Skeleton 
          className='w-[180px] h-3'
        />
      </h3>

      <FormSkeleton width='50%' numberOfInputs={1} />

    </div>
  )
}