"use client";

import Link from "next/link";

import { Plus, Trash, Wand2 } from "lucide-react";
import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getStyles } from "../../_actions/styles";
import { StylesColumns } from "../../_tables/styles";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

export const StylesComponent = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const stylesQuery = useQuery({
    queryKey: ["styles"],
    queryFn: () => getStyles(),
  });

  useEffect(() => {
    stylesQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["styles"] });
  }, [pathname]);

  if (stylesQuery.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <PageTitle label="Styles" icon={Wand2}>
        <Link href="/admin/styles/add">
          <Button>
            <Plus className="mr-2 size-5" /> New
          </Button>
        </Link>
        <Button variant="outline">
          <Trash className="mr-2 size-5" /> Delete
        </Button>
      </PageTitle>

      <DataTable
        rows={stylesQuery?.data?.data?.data && stylesQuery.data.data.data}
        columns={StylesColumns}
      />
    </div>
  );
};
