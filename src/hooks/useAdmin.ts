import { API_URL } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "cookies-next";

import { Admin } from "@/types";
import { headers, useAPI } from "@/lib/utils";

import axios from "axios";

export function useAdmin() {
  const api = useAPI('admins/profile')
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['admins', 'getProfile'],
    queryFn: () => axios.get(api, headers(token))
  })

  const { data, isLoading, refetch } = query
  
  const admin: Admin = data?.data?.admin
  

  return { admin, isLoading, refetch }
}



export function useGetAdmin(id: string) {
  const api = `${API_URL}admins/${id}`
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['admins', id],
    queryFn: () => axios.get(api, headers(token)),
    retry: false
  })

  const { isLoading, isFetched } = query

  const admin: Admin = query.data?.data?.data

  return { admin, isLoading, isFetched, query }
}
