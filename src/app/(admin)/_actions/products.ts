import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditProductSchema, EditUserSchema } from "@/schema";
import { IPaginationParams } from '@/types';


export async function getProducts(params: IPaginationParams|undefined={}) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products`), {...headers(token),params})
}

export async function getProduct(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products/${id}`), headers(token))
}

export async function updateProduct(id: string, values: z.infer<typeof EditProductSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`products/${id}`), values, headers(token))
}

export async function deleteProduct(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`products/${id}`), headers(token))
}

export async function getMeProducts(params: IPaginationParams|undefined={}) {
  const token = getCookie('token')
  return await axios.get(useAPI(`products/me`), {...headers(token),params})
}