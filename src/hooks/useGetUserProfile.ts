import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { User } from "@/types";
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
