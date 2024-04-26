"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { ShoppingBasket, Trash } from "lucide-react"
import { PageTitle } from "../page-title"
import { Button } from "@/components/ui/button"
import { ProductsColumns } from "../../_tables/products";
import { Product } from "@/types";
import { TableSkeleton } from "../table-skeleton";
import { DataTable } from "../data-grid";

import { getProducts } from "../../_actions/products";

export const ProductsComponent = () => {

  const pathname = usePathname()
  const queryClient = useQueryClient()
  
  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['products'] })
  }, [pathname])
  
  const products: Product[] = productsQuery.data?.data?.data?.products

  console.log(products)

  if (productsQuery.isLoading) {
    return (
      <TableSkeleton />
    )
  }

  return (
    <div>
      <PageTitle label='Products' icon={ShoppingBasket} />
      <DataTable 
        rows={products}
        columns={ProductsColumns}
      />
    </div>
  )
}