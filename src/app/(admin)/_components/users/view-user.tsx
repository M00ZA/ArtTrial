"use client";

import { Check, Eye, Hash, Mail, MapPin, Smartphone } from "lucide-react";
import { PageTitle } from "../page-title";
import { notFound, useParams } from "next/navigation";
import { useGetUser } from "@/hooks/useGetUser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Address } from "@/types";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const ViewUserComponent = () => {

  const { id } = useParams()
  const { user, isLoading: userStillLoading } = useGetUser(id as string)

  if (userStillLoading) return <ViewUserComponent.Loading />
  if (!user) return notFound()
  console.log(user)

  const ProfileImage = (
    <div className='flex gap-4 items-center'>
      <Avatar className='size-24'>
        <AvatarImage src={user?.profileImg?.secure_url} alt="@shadcn" />
        <AvatarFallback>{user?.userName?user.userName[0]:"---"}</AvatarFallback>
      </Avatar>
      <div>
        <span className='text-xl flex gap-2 items-center'>
          <span>{user.name}</span>
        </span>
        <span className='block text-xs text-gray-400 font-medium'>{user.email}</span>
      </div>
    </div>
  )

  return (
    <div>
      <PageTitle label={ProfileImage}>
        <Link href={`/admin/users/${user?._id}/edit`}><Button variant='outline'>Update</Button></Link>
        <Link href={`/admin/users/${user?._id}/delete`}><Button variant='destructive'>Delete</Button></Link>
      </PageTitle>

      <ul className='divide-y my-4'>
        {/* <li className='flex justify-between items-center py-1'>
          <span className='flex gap-2 items-center'><Hash className="size-4" /> ID</span>
          <span>{user?._id}</span>
        </li> */}
        <li className='flex justify-between items-center py-1'>
          <span className='flex gap-2 items-center'><Mail className="size-4" /> Email Address</span>
          <span>{user?.email}</span>
        </li>
        <li className='flex justify-between items-center py-1'>
          <span className='flex gap-2 items-center'><Smartphone className="size-4" /> Phone Number</span>
          <span>{user?.phoneNumber}</span>
        </li>
        <li className='flex justify-between items-center py-1'>
          <span className='flex gap-2 items-center'><Check className="size-4" /> Activated</span>
          <span className={cn('font-bold', user.accountActive ? 'text-green-700' : 'text-orange-700')}>{user?.accountActive ? 'Yes' : 'No'}</span>
        </li>
        <li className='flex justify-between py-1'>
          <span className='flex gap-2 items-center'><MapPin className='size-4' /> Addresses</span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span><Button>View</Button></span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Addresses of <b>{user?.name}</b></AlertDialogTitle>
                <AlertDialogDescription>{user?.addresses?.length} addresses found</AlertDialogDescription>
                {user?.addresses?.length > 0 && (
                  <div className="divide-y">
                    {user?.addresses.map((address: Address) => (
                      <div className='py-2' key={address._id}>
                        <h4 className='flex items-center text-xl gap-2'>
                          <span>{address.country} / {address.city}</span>
                          <span className='font-medium mr-2 text-xs text-gray-400'>({address.alias})</span>
                        </h4>
                        <p className='text-gray-500 text-xs'>{address.street} - {address.region}</p>
                        <p className='text-gray-500 text-xs'>Postal Code: {address.postalCode}</p>
                        <p className='text-center'>{address.phone}</p>
                      </div>
                    ))}
                  </div>
                )}
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Close</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
        </li>
      </ul>

      {/* User orders goes here */}
      
    </div>
  );
}

ViewUserComponent.Loading = () => {

  const ProfileImage = (
    <div className='flex gap-4 items-center'>
      <Avatar className='size-24'>
        <AvatarFallback>...</AvatarFallback>
      </Avatar>      
      <div>
        <span className='text-xl flex gap-2 items-center mb-1'>
          <Skeleton className='w-[100px] h-6' />
          <Skeleton className='w-[40px] h-6' />
        </span>
        <span className='block text-xs text-gray-400 font-medium'><Skeleton className='w-[40px] h-4' /></span>
      </div>
    </div>
  )

  return (
    <div>
      <PageTitle label={ProfileImage}>
        <Skeleton className='w-[60px] h-[40px]' />
        <Skeleton className='w-[80px] h-[40px]' />
      </PageTitle>
      <Separator className='my-4' />

      <ul className="divide-y">
        <li className='flex justify-between py-1'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-4 w-[70px]' />
        </li>
        <li className='flex justify-between py-1'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-4 w-[70px]' />
        </li>
        <li className='flex justify-between py-1'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-4 w-[70px]' />
        </li>
        <li className='flex justify-between py-1'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-4 w-[70px]' />
        </li>
        <li className='flex justify-between py-1'>
          <Skeleton className='h-4 w-[150px]' />
          <Skeleton className='h-[40px] w-[70px]' />
        </li>
      </ul>

    </div>
  )
}