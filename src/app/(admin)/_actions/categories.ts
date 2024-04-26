import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditCategorySchema } from "@/schema";

export async function getCategories() {
  const token = getCookie('token')
  return await axios.get(useAPI('categories'), headers(token))
}

export async function getCategory(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`categories/${id}`), headers(token))
}

export async function updateCategory(id: string, values: z.infer<typeof EditCategorySchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`categories/${id}`), values, headers(token))
}

export async function addCategory(values: z.infer<typeof EditCategorySchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`categories`), values, headers(token))
}

export async function deleteCategory(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`categories/${id}`), headers(token))
}