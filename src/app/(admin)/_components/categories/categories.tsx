"use client";

import Link from "next/link";

import { List, Plus, Trash } from "lucide-react";
import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getCategories } from "../../_actions/categories";
import { CategoriesColumns } from "../../_tables/categories";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

export const CategoriesComponent = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    categoriesQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["categories"] });
  }, [pathname]);

  if (categoriesQuery.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <PageTitle label="Categories" icon={List}>
        <Link href="/admin/categories/add">
          <Button>
            <Plus className="mr-2 size-5" /> New
          </Button>
        </Link>
      </PageTitle>

      <DataTable
        rows={
          categoriesQuery?.data?.data?.data && categoriesQuery.data.data.data
        }
        columns={CategoriesColumns}
      />
    </div>
  );
};
