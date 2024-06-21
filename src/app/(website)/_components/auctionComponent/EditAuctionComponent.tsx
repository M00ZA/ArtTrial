"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import {
  addNewProduct,
  getMeProduct,
  getProducts,
  updateMeProduct,
} from "@/app/(admin)/_actions/products";
import { addEvent, getEvent, updateEvent } from "@/app/(admin)/_actions/events";

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

// Types & Validation
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { EditAuctionProductSchema } from "@/schema";
import { Auction, Category, Event, Product } from "@/types";
import { SubmitButton } from "@/app/(admin)/_components/submit-button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/app/(admin)/_actions/categories";
import { getStyles } from "@/app/(admin)/_actions/styles";
import { getSubjects } from "@/app/(admin)/_actions/subjects";
import { getAuctionDetails, updateProductFromAuction } from "@/actions/users";

export default function EditAuctionComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const { id } = useParams();

  useEffect(() => {
    //   subjectsQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["subjects"] });
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    queryClient.invalidateQueries({ queryKey: ["styles"] });
    queryClient.invalidateQueries({ queryKey: ["products", "me", id] });
  }, [pathname]);

  // const productQuery = useQuery({
  //   queryKey: ["products", "me", id],
  //   queryFn: () => getMeProduct(id as string),
  // });

  const auctionQuery = useQuery({
    queryKey: ["auction", "product", id],
    queryFn: () => getAuctionDetails(id as string),
  });

  const auction: Auction = auctionQuery.data?.data?.data;
  // const product: Product = productQuery.data?.data?.data;

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

  const editMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditAuctionProductSchema>) =>
      updateProductFromAuction(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Auction updated successfully!");
        router.push(`/auction/${id}?type=artist`);
        queryClient.invalidateQueries({ queryKey: ["auction", "product", id] });
        return;
      }
      toast.error("Couldnot update auction!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
        return;
      }
    },
  });

  const form = useForm<zod.infer<typeof EditAuctionProductSchema>>({
    defaultValues: {
      title: "",
      description: "",
      finalPrice: undefined,
      // width: "" as unknown as number,
      // height: "" as unknown as number,
      // depth: "" as unknown as number,
      material: "",
      style: "",
      subject: "",
      category: "",
      duration: undefined,
      began: "",
    },
    resolver: zodResolver(EditAuctionProductSchema),
  });

  const { register } = form;

  const updateEventHandler = () => {
    // const { duration, began } = form.getValues();
    console.log(form.getValues());
    editMutation.mutate({
      ...form.getValues(),
      //   duration: parseInt(duration as any),
      //   began:began,
    });
  };

  // console.log(style, "style");
  useEffect(() => {
    if (auction) {
      const style = styles?.find((style) => style?.title == auction?.style);
      const category = categories?.find(
        (category) => category?.title == auction?.category
      );
      const subject = subjects?.find(
        (subject) => subject?.title == auction?.subject
      );
      form.setValue("title", auction?.title);
      form.setValue("description", auction?.description);
      form.setValue(
        "finalPrice",
        auction?.lastPrices[auction?.lastPrices?.length - 1]?.price ||
          auction?.price
      );
      // form.setValue("width", parseInt(auction?.width));
      // form.setValue("height", parseInt(auction?.height));
      // form.setValue("depth", parseInt(auction?.depth));
      form.setValue("material", auction?.material);
      form.setValue("category", category?.id as string);
      form.setValue("style", style?.id as string);
      form.setValue("subject", subject?.id as string);
      form.setValue(
        "began",
        auction?.began &&
          new Date(auction?.began).toISOString().substring(0, 10)
      );
      form.setValue("duration", auction?.duration);
    }
  }, [auction, categories, styles, subjects]);

  return (
    <div className="flex justify-center flex-col items-center py-4   ">
      <Form {...form}>
        <PageTitle
          icon={Edit}
          label={<span className="flex items-center gap-2 ">Edit Product</span>}
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
            name="finalPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Price</FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("finalPrice", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="Initial Price"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
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
          /> */}

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
                    // defaultValue={style?.id}
                    value={field.value}
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
                    // defaultValue={field.value}
                    value={field.value}
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
                    {...field}
                    // onValueChange={field.onChange}
                    // defaultValue={field.value}
                    // value={field.value}
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

          <FormField
            control={form.control}
            name="began"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Began</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="date"
                    placeholder="Began"
                    value={field.value}
                    onChange={field.onChange}
                    // defaultValue={new Date(auction?.began) as unknown as string}
                    // defaultValue={new Date(field.value)
                    //   .toISOString()
                    //   .substring(0, 10)}
                  />
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
                <FormLabel>
                  Duration <span>(days)</span>
                </FormLabel>
                <FormControl>
                  <Input
                    //   defaultValue={event?.duration}
                    {...register("duration", {
                      valueAsNumber: true,
                    })}
                    type="text"
                    placeholder="Duration"
                  />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          {/* inEvent */}

          {/* <FormField
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
                        const imageArray = Array.from(e.target.files).map(
                          (file) => URL.createObjectURL(file)
                        );

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
          /> */}

          <SubmitButton status={editMutation.status} label="Update" />
        </form>
      </Form>
    </div>
  );
}
