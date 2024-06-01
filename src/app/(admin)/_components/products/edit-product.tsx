"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { getProduct, updateProduct } from "../../_actions/products";

// Hooks
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// Components
import { Edit, Loader } from "lucide-react";
import { PageTitle } from "../page-title";
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

// Types & Validation
import * as zod from "zod";
import { Product, User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditProductSchema, EditUserSchema } from "@/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";
import { Textarea } from "@/components/ui/textarea";

export const EditProductComponent = () => {
  const router = useRouter();
  const { id } = useParams();

  const getProductQuery = useQuery({
    queryKey: ["products", id],
    queryFn: ({ queryKey }) => getProduct(queryKey[1] as string),
  });
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditProductSchema>) =>
      updateProduct(id as string, values),
    onSuccess: (d) => {
      console.log(d);
      if (d.data?.code === 200) {
        toast.success("Product Updated successfully!");
        //router.push('/admin/products')
        return;
      }
      toast.error("Couldnot update product!");
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
      console.log(d);
    },
  });

  const product: Product = getProductQuery.data?.data?.data?.product;

  const form = useForm({
    defaultValues: {
      title: product?.title ?? product?.title,
      description: product?.description ?? product?.description,
      price: product?.price ?? parseInt(product?.price as any),
      width: product?.width ?? parseInt(product?.width),
      height: product?.height ?? parseInt(product?.height),
      depth: product?.depth ?? parseInt(product?.depth),
      material: product?.material ?? product?.material,
    },
    resolver: zodResolver(EditProductSchema),
  });

  const { register } = form;

  const updateProductHandler = () => {
    //@ts-ignore
    updateMutation.mutate(form.getValues());
  };

  useEffect(() => {
    if (product) {
      form.setValue("title", product?.title);
      form.setValue("description", product?.description);
      form.setValue("price", product?.price);
      form.setValue("width", product?.width);
      form.setValue("height", product?.height);
      form.setValue("depth", product?.depth);
      form.setValue("material", product?.material);
    }
  }, [product]);

  return (
    <div>
      {!product && getProductQuery.isLoading && (
        <EditProductComponent.LoadingSkeleton />
      )}

      {product && (
        <Form {...form}>
          <PageTitle
            icon={Edit}
            label={
              <span className="flex items-center gap-2">
                Edit Product{" "}
                <Link
                  className="text-sm text-gray-400 font-normal"
                  href={`/admin/products/${product.id}/view`}
                >
                  /{product?.id}
                </Link>
              </span>
            }
          />

          <form
            onSubmit={form.handleSubmit(updateProductHandler)}
            className="flex flex-col gap-y-3 mt-5 w-[50%]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.title}
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
                      defaultValue={product?.description}
                      {...field}
                      rows={9}
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
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.price}
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                      type="text"
                      placeholder="Price"
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
                  <FormLabel>Width</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.width}
                      {...register("width", {
                        valueAsNumber: true,
                      })}
                      type="text"
                      placeholder="Width"
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
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.height}
                      {...register("height", {
                        valueAsNumber: true,
                      })}
                      type="text"
                      placeholder="Height"
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
                  <FormLabel>Depth</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.depth}
                      {...register("depth", {
                        valueAsNumber: true,
                      })}
                      type="text"
                      placeholder="Depth"
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
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={product?.material}
                      {...field}
                      type="text"
                      placeholder="Material"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={updateMutation.status === "pending" ? true : false}
              className="w-fit"
            >
              <span>
                {updateMutation.status === "pending" ? (
                  <Loader className="animate-spin mr-3" />
                ) : (
                  false
                )}
              </span>
              <span>Update</span>
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

EditProductComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className="flex items-center gap-4 font-bold mb-4">
        <Edit />
        <span>Edit Product</span>
        <Skeleton className="w-[180px] h-3" />
      </h3>
      <FormSkeleton width="50%" numberOfInputs={7} />
    </div>
  );
};
