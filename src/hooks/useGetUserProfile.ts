import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { User, userBookedEvent } from "@/types";
import { headers, useAPI } from "@/lib/utils";

import axios from "axios";

export function useGetUserProfile() {
  const api = useAPI(`users/getProfile`)
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['users', "profile"],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched ,data} = query

//   console.log(query?.data?.data , "DDDDDDATA")

  const user: User = data?.data

  return { user, isLoading, isFetched }
}

export function useGetUserEvents() {
  const api = useAPI(`/bookEvent`)
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['users', "bookEvent"],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched ,data} = query

//   console.log(query?.data?.data , "DDDDDDATA")

  const user: userBookedEvent = data?.data

  return { user, isLoading, isFetched }
}
