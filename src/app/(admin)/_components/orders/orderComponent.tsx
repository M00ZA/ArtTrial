"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ShoppingBasket, Trash } from "lucide-react";
import { PageTitle } from "../page-title";
import { Button } from "@/components/ui/button";
import { ProductsColumns } from "../../_tables/products";
import { Order, Product } from "@/types";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

import { getProducts } from "../../_actions/products";
import { getOrders } from "../../_actions/orders";
import { OrdersColumns } from "../../_tables/orders";

export const OrdersComponent = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  }, [pathname]);

  const orders: Order[] = ordersQuery.data?.data?.data;

  console.log(orders);

  if (ordersQuery.isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <PageTitle label="Orders" icon={ShoppingBasket} />
      <DataTable rows={orders} columns={OrdersColumns} />
    </div>
  );
};
