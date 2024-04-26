import * as z from 'zod'
import axios from "axios";

import { headers, useAPI } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { EditSubjectSchema } from "@/schema";

export async function getSubjects() {
  const token = getCookie('token')
  return await axios.get(useAPI('subjects'), headers(token))
}

export async function getSubject(id: string) {
  const token = getCookie('token')
  return await axios.get(useAPI(`subjects/${id}`), headers(token))
}

export async function updateSubject(id: string, values: z.infer<typeof EditSubjectSchema>) {
  const token = getCookie('token')
  return await axios.patch(useAPI(`subjects/${id}`), values, headers(token))
}

export async function addSubject(values: z.infer<typeof EditSubjectSchema>) {
  const token = getCookie('token')
  return await axios.post(useAPI(`subjects`), values, headers(token))
}

export async function deleteSubject(id: string) {
  const token = getCookie('token')
  return await axios.delete(useAPI(`subjects/${id}`), headers(token))
}