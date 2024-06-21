"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { addNewProduct, getProducts } from "@/app/(admin)/_actions/products";
import {
  addProductToEvent,
  getEvent,
  getMeEvent,
  updateEvent,
  updateMeEvent,
} from "@/app/(admin)/_actions/events";
// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, usePathname } from "next/navigation";
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
import { Event, Product, Category } from "@/types";
import { SubmitButton } from "@/app/(admin)/_components/submit-button";

import { AddProductSchema } from "@/schema";
import { getCategories } from "@/app/(admin)/_actions/categories";
import { getStyles } from "@/app/(admin)/_actions/styles";
import { getSubjects } from "@/app/(admin)/_actions/subjects";

export default function AddProductToEvent() {
  const router = useRouter();
  const { id } = useParams();

  // const getEventQuery = useQuery({
  //   queryKey: ["events", "me", id],
  //   queryFn: ({ queryKey }) => getMeEvent(queryKey[2] as string),
  // });

  // const allProducts = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getMeProducts(),
  // });

  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof addProductSchema>) =>
      addProductToEvent(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code == 200 || d.data?.code == 201) {
        toast.success("Event Updated successfully!");
        router.push(`/events/${id}?type=artist`);
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

  // const event: Event = getEventQuery.data?.data?.data;
  // const products: Product[] = allProducts.data?.data?.data?.products;

  // let eventProductsMap = new Map();
  // if (event?.products && event?.products.length > 0) {
  //   event?.products?.forEach((eventProduct) => {
  //     if (eventProduct?.id) eventProductsMap.set(eventProduct?.id, 1);
  //   });
  // }

  const addProductsToEvent = () => {
    console.log("CLICCCCKKKKEEDDD ADD");
    // updateMutation.mutate(form.getValues());
  };

  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    //   subjectsQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["subjects"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["styles"] });
  }, [pathname]);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const stylesQuery = useQuery({
    queryKey: ["styles"],
    queryFn: () => getStyles(),
  });

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects(),
  });
  const categories = categoriesQuery?.data?.data?.data;
  const styles = stylesQuery?.data?.data?.data;
  const subjects = subjectsQuery?.data?.data?.data;

  const addMutation = useMutation({
    mutationFn: (values: zod.infer<typeof AddProductSchema>) =>
      addNewProduct(values),
    onSuccess: (d) => {
      if (d.data?.code == 201) {
        // toast.success("Product created successfully!");
        updateMutation.mutate({ productId: d.data?.data?.id });
        // router.push(`/event/${id}?type=artist`);
        return;
      }
      toast.error("Couldnot create product!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
        return;
      }
    },
  });

  const form = useForm<zod.infer<typeof AddProductSchema>>({
    defaultValues: {
      title: "",
      description: "",
      price: undefined,
      width: "" as unknown as number,
      height: "" as unknown as number,
      depth: "" as unknown as number,
      material: "",
      style: "",
      subject: "",
      category: "",
      images: [],
      coverImage: "",
      inEvent: true,
    },
    resolver: zodResolver(AddProductSchema),
  });

  const { register } = form;

  const updateEventHandler = () => {
    // const { duration, began } = form.getValues();
    console.log(form.getValues());
    addMutation.mutate({
      ...form.getValues(),
      //   duration: parseInt(duration as any),
      //   began:began,
    });
  };

  return (
    <div className="flex justify-center flex-col items-center py-4   ">
      <Form {...form}>
        <PageTitle
          icon={Edit}
          label={<span className="flex items-center gap-2 ">Add Product</span>}
        />

        <form
          onSubmit={form.handleSubmit(updateEventHandler)}
          className="flex flex-col gap-y-3 mt-5 w-[50%] min-w-[400px] mx-auto"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.title}
                    {...field}
                    type="text"
                    placeholder="Title"
                  />
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
                  <Textarea
                    className="resize-none"
                    rows={7}
                    //   defaultValue={event?.description}
                    {...field}
                    placeholder="Description"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>price</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("price", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="price"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="width"
            render={({ field }) => (
              <FormItem>
                <FormLabel>width</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("width", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="width"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>height</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("height", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="height"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>depth</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("depth", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="depth"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>material</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.material}
                    {...field}
                    type="text"
                    placeholder="material"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="style"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Style" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Style</SelectLabel>
                        {styles &&
                          styles.length > 0 &&
                          styles.map((style) => {
                            const { id, title } = style;
                            return (
                              <SelectItem value={id as string} key={id}>
                                {title}
                              </SelectItem>
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

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Subject</SelectLabel>
                        {subjects &&
                          subjects.length > 0 &&
                          subjects.map((subject) => {
                            const { id, title } = subject;
                            return (
                              <SelectItem value={id as string} key={id}>
                                {title}
                              </SelectItem>
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Category</SelectLabel>
                        {categories &&
                          categories.length > 0 &&
                          categories.map((category) => {
                            const { id, title } = category;
                            return (
                              <SelectItem value={id as string} key={id}>
                                {title}
                              </SelectItem>
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

          {/* <FormField
          control={form.control}
          name="inEvent"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value + ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="in event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>in event</SelectLabel>
                      <SelectItem value={false + ""} defaultChecked>
                        No
                      </SelectItem>
                      <SelectItem value={true + ""}>Yes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )}
        /> */}

          {/* inEvent */}

          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose cover image</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e: any) => {
                      form.setValue("coverImage", e?.currentTarget?.files[0]);
                      //   setPic(e?.currentTarget?.files[0]);
                    }}
                    type="file"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Choose product images</FormLabel>
                <FormControl>
                  <Input
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      //   form.setValue("coverImage", e?.currentTarget?.files[0]);
                      //   setPic(e?.currentTarget?.files[0]);
                      //   changeMultipleFiles(e,form)
                      if (e.target.files) {
                        // const imageArray = Array.from(e.target.files).map(
                        //   (file) => URL.createObjectURL(file)
                        // );
                        const imageArray = Array.from(e.target.files);

                        console.log(imageArray);
                        // setMultipleImages((prevImages) => [...prevImages, ...imageArray]);
                        form.setValue("images", imageArray);
                      }
                    }}
                    type="file"
                    multiple
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton status={addMutation.status} label="Add" />
        </form>
      </Form>
    </div>
  );
}
