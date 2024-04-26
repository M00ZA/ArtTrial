import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Category } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";

export function useGetCategory(id: string) {
  const api = `${API_URL}categories/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['categories', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const category: Category = query.data?.data?.data?.category

  return { category, isLoading, isFetched, query }
}
