"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { getMeProducts, getProducts } from "@/app/(admin)/_actions/products";
import {
  addProductToEvent,
  getEvent,
  getMeEvent,
  updateEvent,
  updateMeEvent,
} from "@/app/(admin)/_actions/events";
// Hooks
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Components
import { Edit, Loader, X } from "lucide-react";
import { PageTitle } from "@/app/(admin)/_components/page-title";
import { Form, FormLabel } from "@/components/ui/form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditEventSchema, addProductSchema } from "@/schema";
import { Event, Product } from "@/types";
import { SubmitButton } from "@/app/(admin)/_components/submit-button";

export default function AddProductToEvent() {
  const router = useRouter();
  const { id } = useParams();

  const getEventQuery = useQuery({
    queryKey: ["events", "me", id],
    queryFn: ({ queryKey }) => getMeEvent(queryKey[2] as string),
  });

  const allProducts = useQuery({
    queryKey: ["products"],
    queryFn: () => getMeProducts(),
  });

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof addProductSchema>) =>
      addProductToEvent(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200 || d.data?.code === 20) {
        toast.success("Event Updated successfully!", {
          onAutoClose: () => {
            router.push(`/events/${id}?type=artist`);
          },
        });
        return;
      }
      toast.error("Couldnot update event!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const event: Event = getEventQuery.data?.data?.data;
  const products: Product[] = allProducts.data?.data?.data?.products;

  let eventProductsMap = new Map();
  if (event?.products && event?.products.length > 0) {
    event?.products?.forEach((eventProduct) => {
      if (eventProduct?.id) eventProductsMap.set(eventProduct?.id, 1);
    });
  }

  //   const eventProducts: string[] = event?.products?.map(
  //     (product: Omit<Product, "coverImage"> & { coverImage: string }) =>
  //       product?.id
  //   );

  let filteredProducts = [] as unknown as Product[];
  if (products) {
    filteredProducts = products.filter((prod) => {
      return !eventProductsMap.get(prod?.id);
    }) as unknown as Product[];
  }

  //   const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      productId: "",
    },
    resolver: zodResolver(addProductSchema),
  });

  const addProductsToEvent = () => {
    console.log("CLICCCCKKKKEEDDD ADD");
    updateMutation.mutate(form.getValues());
  };
  //   useEffect(() => {
  //     setSelectedProducts(eventProducts);
  //   }, []);

  //   useEffect(() => {
  //     if (event) {
  //       form.setValue("productId", selectedProducts as any);
  //     }
  //   }, [event]);

  //   useEffect(() => {
  //     form.setValue("productId", selectedProducts as any);
  //   }, [selectedProducts]);

  //   console.log(selectedProducts);

  return (
    <div className="flex justify-center flex-col items-center py-4   ">
      {event && (
        <Form {...form}>
          <PageTitle
            icon={Edit}
            label={
              <span className="flex items-center gap-2">
                Add product to Event
              </span>
            }
          />

          <form
            onSubmit={form.handleSubmit(addProductsToEvent)}
            className="flex flex-col gap-y-3 mt-5 w-[50%]"
          >
            {/* {!allProducts.isLoading && (
              <div>
                <h1 className="text-xl font-semibold mb-2 pb-2 border-bottom border-bottom-gray-300">
                  Choose products
                </h1>

                <div className="flex flex-col divide-y">
                  {products.map((product: Product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-2 select-none py-2"
                    >
                      <Checkbox
                        id={`product_${product.id}`}
                        defaultChecked={eventProducts.includes(product.id)}
                        onCheckedChange={(checked: boolean) => {
                          if (checked) {
                            if (!selectedProducts?.includes(product.id)) {
                              setSelectedProducts((old) => {
                                if (!old) return [product.id];
                                return [...old, product.id];
                              });
                            }
                          } else {
                            if (selectedProducts.includes(product.id)) {
                              setSelectedProducts((old) =>
                                old.filter((item) => item != product.id)
                              );
                            }
                          }
                        }}
                      />
                      <label
                        htmlFor={`product_${product.id}`}
                        className="text-sm capitalize font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {product.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )} */}
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Select Product</SelectLabel>
                          {filteredProducts.length > 0 &&
                            filteredProducts.map((product) => {
                              const { id, title } = product;
                              return (
                                <SelectItem value={id}>{title}</SelectItem>
                              );
                            })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton status={updateMutation.status} label="Add" />
          </form>
        </Form>
      )}
    </div>
  );
}
