"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 
import { addCategory } from '../../_actions/categories';


// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

// Components
import { Edit, Loader, Plus, PlusCircle } from "lucide-react";
import { PageTitle } from "../page-title";
import { Form, FormLabel } from "@/components/ui/form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { Category } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditCategorySchema as AddCategorySchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';

export const AddCategoryComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  
  const addMutation = useMutation({
    mutationFn: (values: zod.infer<typeof AddCategorySchema>) => addCategory(values),
    onSuccess: (d) => {
      console.log(d)
      if (d.data?.code === 201) {
        queryClient.invalidateQueries({ queryKey: ['categories'] })
        toast.success("Category Added successfully!")
        router.push('/admin/categories')
        return;
      }
      toast.error("Couldnot Add category!")
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })


  const form = useForm({
    defaultValues: {
      title: '',
      slug: '',
    },
    resolver: zodResolver(AddCategorySchema)
  })

  const addCategoryHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['categories'] })
    addMutation.mutate(form.getValues())
  }

  return (
    <div>

      <Form {...form}>
        <PageTitle icon={PlusCircle} label={<span className='flex items-center gap-2'>Add Category </span>} />

        <form onSubmit={form.handleSubmit(addCategoryHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='Name' />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={addMutation.status === 'pending' ? true : false} className='w-fit'>
            <span>{addMutation.status === 'pending' ? <Loader className='animate-spin mr-3' /> : false}</span>
            <span>Add</span>
          </Button>

        </form>

      </Form>
    </div>
  );
}
