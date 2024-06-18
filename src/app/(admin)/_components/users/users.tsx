"use client";

import { Trash, Users } from "lucide-react";
import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { DataGrid } from "@mui/x-data-grid";
import { UsersColumns } from "../../_tables/users";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getUsers } from "../../_actions/users";
import { usePathname } from "next/navigation";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

export const UsersComponent = () => {
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers({}),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }, [pathname]);

  if (usersQuery.isLoading) {
    return <TableSkeleton />;
  }

  console.log(usersQuery?.data?.data?.data?.users);

  return (
    <div>
      <PageTitle label="Users" icon={Users} />
      <DataTable
        rows={usersQuery?.data?.data && usersQuery?.data?.data?.data?.users}
        columns={UsersColumns}
      />
    </div>
  );
};
