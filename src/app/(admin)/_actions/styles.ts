import * as z from 'zod'
import axios, { AxiosResponse } from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import {  EditStyleSchema } from "@/schema";
import { GetStylesResponse } from '@/types';

export async function getStyles():Promise<AxiosResponse<GetStylesResponse, any>>  {
  const token = getCookie('token')
  return await axios.get(useAPI('styles'), headers(token))
}

export async function getStyle(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`styles/${id}`), headers(token))
}

export async function updateStyle(id: string, values: z.infer<typeof EditStyleSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`styles/${id}`), values, headers(token))
}

export async function addStyle(values: z.infer<typeof EditStyleSchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`styles`), values, headers(token))
}

export async function deleteStyle(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`styles/${id}`), headers(token))
}