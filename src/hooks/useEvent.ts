import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Event } from "@/types";
import { headers } from "@/lib/utils";

import axios from "axios";
import { getEvent } from "@/app/(admin)/_actions/events";

export function useEvent(id: string) {
  const api = `${API_URL}events/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['events', id],
    // queryFn: () => axios.get(api, headers(token)),
     queryFn: () =>  getEvent(id),
  
    retry: false
  })

  const { isLoading, isFetched,data } = query

  console.log(query,"querry")
  const event: Event = query.data?.data?.data
  console.log(data)

  return { event, isLoading, isFetched, query }
}
