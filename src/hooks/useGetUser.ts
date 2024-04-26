import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { User } from "@/types";
import { headers, useAPI } from "@/lib/utils";

import axios from "axios";

export function useGetUser(id: string) {
  const api = useAPI(`user/account/${id}`)
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['users', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  console.log(query?.data?.data , "DDDDDDATA")

  const user: User = query.data?.data?.getUser

  return { user, isLoading, isFetched, query }
}
