import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Event } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";

export function useEvent(id: string) {
  const api = `${API_URL}events/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['events', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const event: Event = query.data?.data?.data?.event

  return { event, isLoading, isFetched, query }
}
