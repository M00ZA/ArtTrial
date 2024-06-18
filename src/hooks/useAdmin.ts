import { API_URL } from "@/lib/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCookie, getCookie } from "cookies-next";

import { Admin } from "@/types";
import { headers, useAPI } from "@/lib/utils";

import axios from "axios";
import { useRouter } from "next/navigation";

export function useAdmin() {
  const api = useAPI('admins/getProfile')
  const token = getCookie('token')

  const query = useQuery({
    queryKey: ['admins', 'getProfile'],
    queryFn: () => axios.get(api, headers(token))
  })

  const { data, isLoading, refetch } = query

  const admin: Admin = data?.data?.data
  

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

export function useAdminLougout(){
  const router = useRouter();
  const queryClient = useQueryClient();

  const logoutHandler = (e:any) => {
    console.log("logout handler called")
    e.preventDefault();
    deleteCookie("token");
    queryClient.resetQueries();
    queryClient.removeQueries();
    router.push(`/admin/login`);
  }

  return logoutHandler
}