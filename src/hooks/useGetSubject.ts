import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Subject } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";

export function useGetSubject(id: string) {
  const api = `${API_URL}subjects/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['subjects', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const subject: Subject = query.data?.data?.data?.subject

  return { subject, isLoading, isFetched, query }
}
