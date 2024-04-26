"use client"

// NextJS
import Link from 'next/link';

// Helpers
import { toast } from 'sonner'; 
import { getProducts } from '../../_actions/products';
import { getEvent, updateEvent } from '../../_actions/events';

// Hooks
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// Components
import { Edit, Loader, X } from "lucide-react";
import { PageTitle } from "../page-title";
import { Form, FormLabel } from "@/components/ui/form";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from '@/components/ui/skeleton';
import { FormSkeleton } from '@/components/skeletons/form-skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

// Types & Validation
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { EditEventSchema } from '@/schema';
import { Event, Product } from "@/types";
import { SubmitButton } from '../submit-button';

export const EditEventComponent = () => {
  const router = useRouter()
  const { id } = useParams()

  const getEventQuery = useQuery({
    queryKey: ['events', 'me', id],
    queryFn: ({ queryKey }) => getEvent(queryKey[2] as string)
  })

  const allProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditEventSchema>) => updateEvent(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Event Updated successfully!")
        //router.push('/admin/events')
        return;
      }
      toast.error("Couldnot update event!")
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message)
      }
    }
  })

  const event: Event = getEventQuery.data?.data?.data?.event
  const products: Product[] = allProducts.data?.data?.data?.products.filter((p: Product) => p?.owner?._id === event?.owner?._id)
  const eventProducts: string[] = event?.products?.map((product: Product) => product._id)

  const [selectedProducts, setSelectedProducts] = useState<string[]>(eventProducts)

  const form = useForm({
    defaultValues: {
      title: event?.title ?? event?.title,
      description: event?.description ?? event?.description,
      duration: event?.duration ?? event?.duration,
      products: [],
    },
    resolver: zodResolver(EditEventSchema)
  })

  const { register } = form

  const updateEventHandler = () => {
    updateMutation.mutate(form.getValues())
  }

  useEffect(() => {
    if (event) {
      form.setValue('title', event?.title);
      form.setValue('description', event?.description);
      form.setValue('duration', event?.duration);
      form.setValue('products', selectedProducts as any)
    }
  }, [event]);

  useEffect(() => {
    form.setValue('products', selectedProducts as any)
  }, [selectedProducts])

  console.log(selectedProducts)

  return (
    <div>

      {!event && getEventQuery.isLoading && (
        <EditEventComponent.LoadingSkeleton />
      )}

      {event && (

        <Form {...form}>

          <PageTitle icon={Edit} label={<span className='flex items-center gap-2'>Edit Event</span>} />

          <form onSubmit={form.handleSubmit(updateEventHandler)} className='flex flex-col gap-y-3 mt-5 w-[50%]'>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input defaultValue={event?.title} {...field} type='text' placeholder='Title' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className='resize-none' rows={7} defaultValue={event?.description} {...field} placeholder='Description' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration <span>(days)</span></FormLabel>
                  <FormControl>
                    <Input defaultValue={event?.duration} {...register('duration', {
                      valueAsNumber: true
                    })} type='text' placeholder='Duration' />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            {!allProducts.isLoading && (
              <div>
                <h1 className='text-xl font-semibold mb-2 pb-2 border-bottom border-bottom-gray-300'>Choose products</h1>

                <div className='flex flex-col divide-y'> 
                  {products.map((product: Product) => (
                    <div key={product._id} className='flex items-center gap-2 select-none py-2'>
                      <Checkbox 
                        id={`product_${product._id}`}
                        defaultChecked={eventProducts.includes(product._id)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            if (!selectedProducts.includes(product._id)) {
                              setSelectedProducts(old => [
                                ...old,
                                product._id
                              ])
                            }
                          } else {
                            if (selectedProducts.includes(product._id)) {
                              setSelectedProducts(old => old.filter(item => item != product._id))
                            }
                          }
                        }}
                      />
                      <label
                        htmlFor={`product_${product._id}`}
                        className="text-sm capitalize font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {product.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!allProducts.isLoading && products?.length >= 3 ? (
              <SubmitButton status={updateMutation.status} />
            ) : (
              <Alert variant='destructive'>
                <X className="h-4 w-4" />
                <AlertTitle>Owner Doesn't have 3 products to update this event</AlertTitle>
                <AlertDescription>
                  This owner must have at least 3 products to update this event, please inform him!
                </AlertDescription>
              </Alert>
            )}

          </form>

        </Form>
      )} 
    </div>
  );
}
 

EditEventComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className='flex items-center gap-4 font-bold mb-4'>
        <Edit />
        <span>Edit Event</span>
        <Skeleton className='w-[180px] h-3' />
      </h3>
      <FormSkeleton width='50%' numberOfInputs={3} />
    </div>
  )
}