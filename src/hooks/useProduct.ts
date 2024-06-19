import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { getProduct } from "@/app/(admin)/_actions/products";

export function useProduct(id: string) {


  const query = useQuery({
    queryKey: ['products', id],
    queryFn: () => getProduct(id),
    retry: false
  })

  const { isLoading, isFetched } = query

  const product: Product = query.data?.data?.data

  return { product, isLoading, isFetched, query }
}
