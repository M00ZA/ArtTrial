import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Style } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";

export function useGetStyle(id: string) {
  const api = `${API_URL}styles/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['styles', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const style: Style = query.data?.data?.data?.style

  return { style, isLoading, isFetched, query }
}
