"use client";

// NextJS
import Link from "next/link";

// Helpers
import { toast } from "sonner";
import { getCategory, updateCategory } from "../../_actions/categories";

// Hooks
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditCategorySchema } from "@/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect } from "react";
import { FormSkeleton } from "@/components/skeletons/form-skeleton";

export const EditCategoryComponent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const getCategoryQuery = useQuery({
    queryKey: ["categories", id],
    queryFn: ({ queryKey }) => getCategory(queryKey[1] as string),
  });
  const updateMutation = useMutation({
    mutationFn: (values: zod.infer<typeof EditCategorySchema>) =>
      updateCategory(id as string, values),
    onSuccess: (d) => {
      if (d.data?.code === 200) {
        toast.success("Category Updated successfully!");
        router.push("/admin/categories");
        return;
      }
      toast.error("Couldnot update category!");
      console.log(d);
    },
    onError: (d: any) => {
      if (d?.response?.data?.message) {
        toast.error(d?.response?.data?.message);
      }
    },
  });

  const category: Category = getCategoryQuery.data?.data?.data?.category;

  const form = useForm({
    defaultValues: {
      title: category?.title ?? category?.title,
      slug: category?.slug ?? category?.slug,
    },
    resolver: zodResolver(EditCategorySchema),
  });

  const updateCategoryHandler = () => {
    queryClient.invalidateQueries({ queryKey: ["categories"] });
    updateMutation.mutate(form.getValues());
  };

  useEffect(() => {
    if (category) {
      form.setValue("title", category?.title);
      form.setValue("slug", category?.slug);
    }
  }, [category]);

  return (
    <div>
      {!category && getCategoryQuery.isLoading && (
        <EditCategoryComponent.LoadingSkeleton />
      )}

      {category && (
        <Form {...form}>
          <PageTitle
            icon={Edit}
            label={
              <span className="flex items-center gap-2">
                Edit Category{" "}
                <Link
                  className="text-sm text-gray-400 font-normal"
                  href={`/admin/categories/${category?.id}/view`}
                >
                  /{category?.title} ({category.slug})
                </Link>
              </span>
            }
          />

          <form
            onSubmit={form.handleSubmit(updateCategoryHandler)}
            className="flex flex-col gap-y-3 mt-5 w-[50%]"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={category?.title}
                      {...field}
                      type="text"
                      placeholder="Name"
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

EditCategoryComponent.LoadingSkeleton = () => {
  return (
    <div>
      <h3 className="flex items-center gap-4 font-bold mb-4">
        <Edit />
        <span>Edit Category</span>
        <Skeleton className="w-[180px] h-3" />
      </h3>

      <FormSkeleton width="50%" numberOfInputs={1} />
    </div>
  );
};
