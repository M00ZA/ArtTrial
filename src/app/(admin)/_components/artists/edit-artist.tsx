"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 


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
import { Artist } from "@/types";
import { zodResolver } from '@hookform/resolvers/zod'
import { EditArtistSchema } from '@/schema';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';
import { getArtist, updateArtist } from '../../_actions/artists';

export const EditArtistComponent = () => {

  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()

  const getArtistQuery = useQuery({
    queryKey: ['artists', id],
    queryFn: ({ queryKey }) => getArtist(queryKey[1] as string)
  })
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditArtistSchema>) => updateArtist(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Artist Updated successfully!")
        router.push('/admin/artists')
        return;
      }
      toast.error("Couldnot update artist!")
    }
  })

  const artist: Artist = getArtistQuery.data?.data?.data

  const form = useForm({
    defaultValues: {
      name: artist?.name ?? artist?.name,
      phone: artist?.phone ?? artist?.phone,
    },
    resolver: zodResolver(EditArtistSchema)
  })

  const updateArtistHandler = () => {
    queryClient.invalidateQueries({ queryKey: ['artists'] })
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (artist) {
      form.setValue('name', artist?.name);
      form.setValue('phone', artist?.phone);
    }
  }, [artist]);

  return (
    <div>

      {!artist && getArtistQuery.isLoading && (
        <EditArtistComponent.LoadingSkeleton />
      )}

      {artist && (

        <Form {...form}>
          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit Artist <Link className='text-sm text-gray-400 font-normal' href={`/admin/artists/${artist?._id}/view`}>/{artist?.name} ({artist.email})</Link></span>} />

          <form onSubmit={form.handleSubmit(updateArtistHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full-Name</FormLabel>
                  <FormControl>
                    <Input defaultValue={artist?.name} {...field} type='text' placeholder='Name' />
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
                    <Input defaultValue={artist?.phone} {...field} type='text' placeholder='Phone Number' />
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


EditArtistComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit Artist</span>
        <Skeleton 
          className='w-[180px] h-3'
        />
      </h3>

      <FormSkeleton width='50%' numberOfInputs={3} />

    </div>
  )
}