"use client";

import Link from "next/link";

import { Clock, Eye, Timer, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTitle } from "../page-title";

import { getEvent } from "../../_actions/events";
import { notFound, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useGetArtist } from "@/hooks/useGetArtist";

import { Event, Product } from "@/types";
import { formatDate, formatMoney } from "@/lib/utils";

import { useAdmin } from "@/hooks/useAdmin";

import translate from "@/translations/translate";

export const ViewEventComponent = () => {
  const { id: eventId }: { id: string } = useParams();
  const { admin, isLoading: adminLoading } = useAdmin();

  const eventQuery = useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEvent(eventId),
  });

  const event: Event = eventQuery.data?.data?.data?.event;

  const { artist: owner, isLoading: ownerLoading } = useGetArtist(
    event?.owner?._id
  );

  if (eventQuery.isLoading) return <ViewEventComponent.Loading />;
  if (eventQuery.isFetched && !event) return notFound();

  return (
    <div>
      <PageTitle
        label={
          <span className="flex items-center gap-2">
            {translate("view_event")}
          </span>
        }
      >
        <Link href={`/admin/events/${eventId}/edit`}>
          <Button variant="outline">{translate("edit")}</Button>
        </Link>
        <Link href={`/admin/events/${eventId}/delete`}>
          <Button variant="destructive">{translate("delete")}</Button>
        </Link>
      </PageTitle>

      <div className="mt-2 mb-0">
        <h3>{translate("event_details")}</h3>
        <Separator />
        {/* Display Details */}
        <div className="py-2">
          <div className="bg-gray-50 border p-4 rounded-md">
            <h4 className="font-bold capitalize">{event?.title}</h4>
            <p className="text-gray-500">{event?.description}</p>
          </div>

          <ul>
            <li className="flex items-center justify-between w-full py-2">
              <span className="flex gap-3 items-center">
                <Clock className="size-4" /> {translate("start_at")}
              </span>
              <span>{formatDate(event?.began)}</span>
            </li>
            <li className="flex items-center justify-between w-full py-2">
              <span className="flex gap-3 items-center">
                <Clock className="size-4" /> {translate("end_at")}
              </span>
              <span>{formatDate(event?.end)}</span>
            </li>
            <li className="flex items-center justify-between w-full py-2">
              <span className="flex gap-3 items-center">
                <Timer className="size-4" /> {translate("duration")}
              </span>
              <span>{event?.duration} day (s)</span>
            </li>
            <li className="flex items-center justify-between w-full py-2">
              <span className="flex gap-3 items-center">
                <User className="size-4" /> {translate("owner")}
              </span>
              {!owner && !ownerLoading ? (
                <span>Owner Doesn't Exist</span>
              ) : (
                <>
                  {ownerLoading ? (
                    <Skeleton className="h-2 w-[100px]" />
                  ) : (
                    <span>
                      <Link
                        href={`/admin/artists/${owner?._id}/view`}
                        className="text-blue-700 hover:underline"
                      >
                        {owner?.name}
                      </Link>
                    </span>
                  )}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h3>{translate("products")}</h3>
        <Separator />
        {/* Display Products */}
        <div className="xl:grid grid-cols-4 mt-2 gap-3">
          {event?.products?.length > 0 ? (
            <>
              {event?.products?.map((product: Product) => (
                <div className="bg-gray-50/10 border rounded-sm p-2">
                  <h3 className="text-center capitalize font-semibold">
                    {product?.title}
                  </h3>
                  <ul>
                    <li className="text-sm flex justify-between py-2 px-4">
                      <span>ID</span>{" "}
                      <span>
                        <Link
                          href={`/admin/products/${product?.id}`}
                          className="text-blue-600"
                        >
                          View Product
                        </Link>
                      </span>
                    </li>
                    <li className="text-sm flex justify-between py-2 px-4">
                      <span>Price</span>{" "}
                      <span className="text-green-600 font-bold">
                        {formatMoney(product?.price)}
                      </span>
                    </li>
                    <li className="text-sm flex justify-between py-2 px-4">
                      <span>Category</span> <span>{product?.category}</span>
                    </li>
                    <li className="text-sm flex justify-between py-2 px-4">
                      <span>Subject</span>{" "}
                      <span>{product?.subject?.title}</span>
                    </li>
                    {product?.style && (
                      <li className="text-sm flex justify-between py-2 px-4">
                        <span>Style</span> <span>{product?.style?.title}</span>
                      </li>
                    )}
                  </ul>
                  {adminLoading ? (
                    <div className="grid grid-cols-3 gap-1">
                      <Skeleton className="h-[40px]" />
                      <Skeleton className="h-[40px]" />
                      <Skeleton className="h-[40px]" />
                    </div>
                  ) : (
                    <div className="pt-2 grid grid-cols-3 gap-1 flex-wrap px-4">
                      <Link href={`/admin/products/${product?.id}/edit`}>
                        <Button
                          className="w-full text-xs"
                          variant="outline"
                          size="sm"
                        >
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product?.id}/view`}>
                        <Button
                          className="w-full text-xs"
                          variant="outline"
                          size="sm"
                        >
                          View
                        </Button>
                      </Link>
                      <Link href={`/admin/products/${product?.id}/delete`}>
                        <Button
                          className="w-full text-xs"
                          variant="outline"
                          size="sm"
                        >
                          Delete
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div>0 products found</div>
          )}
        </div>
      </div>
    </div>
  );
};

ViewEventComponent.Loading = () => {
  return (
    <div>
      <PageTitle label={"View Event"}>
        <Skeleton className="w-[60px] h-[40px]" />
        <Skeleton className="w-[80px] h-[40px]" />
      </PageTitle>
      <Separator className="my-4" />

      <Skeleton className="w-[120px] h-3" />
      <Separator className="mt-2 mb-2" />

      <ul>
        <li className="flex justify-between py-1">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[70px]" />
        </li>
        <li className="flex justify-between py-1">
          <Skeleton className="h-8 w-[150px]" />
          <Skeleton className="h-8 w-[70px]" />
        </li>
      </ul>

      <Skeleton className="w-[120px] mt-4 h-3" />
      <Separator className="my-2 mb-3" />

      {/* Events */}
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 5 }).map(() => (
          <Skeleton className="h-[155px]" />
        ))}
      </div>
    </div>
  );
};
