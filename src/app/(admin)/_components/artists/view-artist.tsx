"use client";

import Link from "next/link";
import Image from "next/image";

import { useGetArtist } from "@/hooks/useGetArtist";
import { notFound, useParams } from "next/navigation";

import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Hash, Mail, MapPin, Smartphone } from "lucide-react";
import { Address } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ViewArtistComponent = () => {
  const params = useParams();

  const { artist, isLoading } = useGetArtist(params.id as any);

  console.log(artist);

  if (isLoading) {
    return <ViewArtistComponent.Loading />;
  }

  if (!artist) {
    return notFound();
  }

  const ProfileImage = (
    <div className="flex gap-4 items-center">
      <Avatar className="size-24">
        <AvatarImage src={artist?.profileImg} alt="@shadcn" />
        <AvatarFallback>{artist?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <span className="text-xl flex gap-2 items-center">
          <span>{artist.name}</span>
          <span className="text-gray-400 font-medium text-xs">
            {artist.accountActive ? "Activated" : "Not Activated"}
          </span>
        </span>
        <span className="block text-xs text-gray-400 font-medium">
          {artist.email}
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <PageTitle label={ProfileImage}>
        <Link href={`/admin/artists/${artist.id}/edit`}>
          <Button className="flex gap-2" variant="outline">
            Edit
          </Button>
        </Link>
        <Link href={`/admin/artists/${artist.id}/delete`}>
          <Button className="flex gap-2" variant="destructive">
            Delete
          </Button>
        </Link>
      </PageTitle>

      <Separator className="my-4" />

      <ul className="divide-y">
        <li className="flex justify-between py-1">
          <span className="flex gap-2 items-center">
            <Hash className="size-4" /> ID
          </span>
          <span>{artist?.id}</span>
        </li>
        <li className="flex justify-between py-1">
          <span className="flex gap-2 items-center">
            <Mail className="size-4" /> Email
          </span>
          <span>{artist?.email}</span>
        </li>
        <li className="flex justify-between py-1">
          <span className="flex gap-2 items-center">
            <Smartphone className="size-4" /> Phone
          </span>
          <span>{artist?.phone}</span>
        </li>
        <li className="flex justify-between py-1">
          <span className="flex gap-2 items-center">
            <Check className="size-4" /> Is Active?
          </span>
          <span>{artist?.accountActive ? "Yes" : "No"}</span>
        </li>
        <li className="flex justify-between py-1">
          <span className="flex gap-2 items-center">
            <MapPin className="size-4" /> Addresses
          </span>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <span>
                <Button>View</Button>
              </span>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Addresses of <b>{artist.name}</b>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {artist.addresses?.length} addresses found
                </AlertDialogDescription>
                {artist.addresses?.length > 0 && (
                  <div className="divide-y">
                    {artist.addresses.map((address: Address) => (
                      <div className="py-2" key={address._id}>
                        <h4 className="flex items-center text-xl gap-2">
                          <span>
                            {address.country} / {address.city}
                          </span>
                          <span className="font-medium mr-2 text-xs text-gray-400">
                            ({address.alias})
                          </span>
                        </h4>
                        <p className="text-gray-500 text-xs">
                          {address.street} - {address.region}
                        </p>
                        <p className="text-gray-500 text-xs">
                          Postal Code: {address.postalCode}
                        </p>
                        <p className="text-center">{address.phone}</p>
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
    </div>
  );
};

ViewArtistComponent.Loading = () => {
  const ProfileImage = (
    <div className="flex gap-4 items-center">
      <Avatar className="size-24">
        <AvatarFallback>...</AvatarFallback>
      </Avatar>
      <div>
        <span className="text-xl flex gap-2 items-center mb-1">
          <Skeleton className="w-[100px] h-6" />
          <Skeleton className="w-[40px] h-6" />
        </span>
        <span className="block text-xs text-gray-400 font-medium">
          <Skeleton className="w-[40px] h-4" />
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <PageTitle label={ProfileImage}>
        <Skeleton className="w-[60px] h-[40px]" />
        <Skeleton className="w-[80px] h-[40px]" />
      </PageTitle>
      <Separator className="my-4" />

      <ul className="divide-y">
        <li className="flex justify-between py-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-[40px] w-[70px]" />
        </li>
      </ul>

      <Separator className="my-4" />

      {/* Events */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className="h-[155px]" />
        ))}
      </div>
    </div>
  );
};
