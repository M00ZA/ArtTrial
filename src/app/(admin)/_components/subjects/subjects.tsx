"use client";

import Link from "next/link";

import { Captions, Plus, Trash } from "lucide-react";
import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { getSubjects } from "../../_actions/subjects";
import { SubjectsColumns } from "../../_tables/subjects";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

export const SubjectsComponent = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const subjectsQuery = useQuery({
    queryKey: ["subjects"],
    queryFn: () => getSubjects(),
  });

  useEffect(() => {
    subjectsQuery.refetch();
    queryClient.invalidateQueries({ queryKey: ["subjects"] });
  }, [pathname]);

  if (subjectsQuery.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <PageTitle label="Subjects" icon={Captions}>
        <Link href="/admin/subjects/add">
          <Button>
            <Plus className="mr-2 size-5" /> New
          </Button>
        </Link>
        <Button variant="outline">
          <Trash className="mr-2 size-5" /> Delete
        </Button>
      </PageTitle>

      <DataTable
        rows={subjectsQuery?.data?.data?.data && subjectsQuery.data.data.data}
        columns={SubjectsColumns}
      />
    </div>
  );
};
