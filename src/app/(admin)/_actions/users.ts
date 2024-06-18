import * as z from 'zod'
import axios, { AxiosResponse } from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditUserSchema } from "@/schema";
import { GetUsersResponse, pageParams } from '@/types';

export async function getUsers(params:pageParams):Promise<AxiosResponse<GetUsersResponse, any>> {
  const token = getCookie('token')
  return await axios.get(useAPI(`users`), {
    ...headers(token),
    params
  })
}

export async function getUser(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`users/${id}`), headers(token))
}

export async function updateUser(id: string, values: z.infer<typeof EditUserSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`users/${id}`), values, headers(token))
}

export async function deleteUser(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`users/${id}`), headers(token))
}