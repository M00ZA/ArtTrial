import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Product } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";

export function useProduct(id: string) {
  const api = `${API_URL}products/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['products', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const product: Product = query.data?.data?.data?.product

  return { product, isLoading, isFetched, query }
}
