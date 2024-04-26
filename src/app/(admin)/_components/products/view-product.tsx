"use client"

import { Eye } from "lucide-react";
import { PageTitle } from "../page-title";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../_actions/products";
import { Picture, Product } from "@/types";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn, formatMoney } from "@/lib/utils";
import { useState } from "react";

export const ViewProductComponent = () => {

  const { id }: { id: string } = useParams()

  const productQuery = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    retry: 3
  })

  const product: Product = productQuery?.data?.data?.data?.product
  const [current, setCurrent] = useState(product?.coverImage?.secure_url)

  console.log(current)

  return (
    <div>
      <PageTitle label={<span className='flex items-center gap-2'>View Product</span>}>
        <Link href={`/admin/products/${id}/edit`}><Button variant='outline'>Edit</Button></Link>
        <Link href={`/admin/products/${id}/delete`}><Button variant='destructive'>Delete</Button></Link>
      </PageTitle>

      <Separator className='mb-4 mt-1' />

      <div className='flex gap-5'>
        <section className='w-[600px]'>
          <div className='mb-4 rounded-md flex items-center justify-center mb-2'>
            <Image src={current ?? product?.coverImage.secure_url} alt='Logo' width={300} height={300} className='h-[500px] w-[500px] rounded-md ring-2 ring-primary hover:scale-[102.5%] transition-all' />
          </div>
          <div className='flex gap-2 justify-center'>
            {product?.images?.map((image: Picture, idx) => (
              <Image
                onClick={() => setCurrent(old => image?.secure_url)}
                className={cn('rounded-md', current === image?.secure_url && 'border-2 border-primary', 'hover:scale-110 transition-all')}
                src={image.secure_url} 
                alt='Logo' 
                width={80} 
                height={80} 
                key={idx} 
              />
            ))}
          </div>
        </section>

        <section className='w-full'>
          <header>
            <h2 className='font-bold flex items-center gap-2'>{product?.title} <span className='text-xs font-normal text-gray-500'>({product?.isAvailable ? 'Available' : 'Not Available'})</span></h2>
            <span className='text-green-700 font-bold text-xl'>{formatMoney(product?.price)}</span>
            <p className='bg-gray-100 p-2 rounded-md shadow-sm text-xs border leading-6 my-2'>{product?.description}</p>
          </header>
          <section className='flex justify-between items-center pb-2 border-b'>
            <h5>Sizes</h5>
            <ul className='flex gap-1'>
              <li className='bg-gray-100 p-2 rounded-md shadow-sm text-xs border'>{product?.width}</li>
              <li className='bg-gray-100 p-2 rounded-md shadow-sm text-xs border'>{product?.height}</li>
              <li className='bg-gray-100 p-2 rounded-md shadow-sm text-xs border'>{product?.depth}</li>
            </ul>
          </section>
          <section className='divide-y'>
            <div className='flex justify-between items-center py-2'>
              <div>Owner</div>
              <div className='font-bold'>{product?.owner?.name ?? 'Not-Available'}</div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div>Material</div>
              <div className='font-bold'>{product?.material ?? 'Not-Available'}</div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div>Category</div>
              <div className='font-bold'>{product?.category?.title ?? 'Not-Available'}</div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div>Style</div>
              <div className='font-bold'>{product?.style?.title ?? 'Not-Available'}</div>
            </div>
            <div className='flex justify-between items-center py-2'>
              <div>Subject</div>
              <div className='font-bold'>{product?.subject?.title ?? 'Not-Available'}</div>
            </div>
          </section>
        </section>
      </div>

    </div>
  );
}

ViewProductComponent.Loading = () => {
  return (
    <div>
      <PageTitle icon={Eye} label={<span className='flex items-center gap-2'>View Product</span>}>
        <Skeleton className='w-[60px] h-12' />
        <Skeleton className='w-[80px] h-12' />
      </PageTitle>
    </div>
  )
}


 