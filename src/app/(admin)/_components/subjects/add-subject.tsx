"use client"


// Helpers
import { toast } from 'sonner'; 
import { addSubject } from '../../_actions/subjects';



// Hooks
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

// Components
import { Loader, PlusCircle } from "lucide-react";
import { PageTitle } from "../page-title";
import { Form, FormLabel } from "@/components/ui/form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Types & Validation
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditSubjectSchema as AddSubjectSchema } from '@/schema';


export const AddSubjectComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  
  const addMutation = useMutation({
    mutationFn: (values: zod.infer<typeof AddSubjectSchema>) => addSubject(values),
    onSuccess: (d) => {
      console.log(d)
      if (d.data?.code === 201) {
        queryClient.invalidateQueries({ queryKey: ['subjects'] })
        toast.success("Subject Added successfully!")
        router.push('/admin/subjects')
        return;
      }
      toast.error("Couldnot Add Subject!")
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
    resolver: zodResolver(AddSubjectSchema)
  })

  const addSubjectHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['subjects'] })
    addMutation.mutate(form.getValues())
  }

  return (
    <div>

      <Form {...form}>
        <PageTitle icon={PlusCircle} label={<span className='flex items-center gap-2'>Add Subject </span>} />

        <form onSubmit={form.handleSubmit(addSubjectHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

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
