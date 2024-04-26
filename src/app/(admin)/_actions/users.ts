import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditUserSchema } from "@/schema";
import { pageParams } from '@/types';

export async function getUsers(params:pageParams) {
  const token = getCookie('token')
  return await axios.get(useAPI(`user`), {
    ...headers(token),
    params:params|| {
      page: 1,
      size: 3,
      sortBy:"userName asc"
    }
  })
}

export async function getUser(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`user/account/${id}`), headers(token))
}

export async function updateUser(id: string, values: z.infer<typeof EditUserSchema>) {
  const token = getCookie('token')
  return await axios.put(useAPI(`user/update/${id}`), values, headers(token))
}

export async function deleteUser(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`user/delete/${id}`), headers(token))
}